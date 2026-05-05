// Helper
const calculateSeekTime = (sequence) => {
  let seek = 0;
  for (let i = 1; i < sequence.length; i++) {
    seek += Math.abs(sequence[i] - sequence[i - 1]);
  }
  return seek;
};

// FCFS
export const fcfs = (requests, head) => {
  const sequence = [head, ...requests];
  return { sequence, seekTime: calculateSeekTime(sequence) };
};

// SSTF
export const sstf = (requests, head) => {
  let pending = [...requests];
  let current = head;
  let sequence = [head];

  while (pending.length) {
    let closest = pending.reduce((prev, curr) =>
      Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
    );

    sequence.push(closest);
    current = closest;
    pending = pending.filter((r) => r !== closest);
  }

  return { sequence, seekTime: calculateSeekTime(sequence) };
};

// SCAN
export const scan = (requests, head, direction) => {
  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r >= head).sort((a, b) => a - b);

  let sequence = [head];

  if (direction === "LEFT") {
    sequence.push(...left.reverse(), 0, ...right);
  } else {
    sequence.push(...right, 199, ...left.reverse());
  }

  return { sequence, seekTime: calculateSeekTime(sequence) };
};

// C-SCAN
export const cscan = (requests, head, direction) => {
  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r >= head).sort((a, b) => a - b);

  let sequence = [head];

  if (direction === "RIGHT") {
    sequence.push(...right, 199, 0, ...left);
  } else {
    sequence.push(...left.reverse(), 0, 199, ...right.reverse());
  }

  return { sequence, seekTime: calculateSeekTime(sequence) };
};

// LOOK
export const look = (requests, head, direction) => {
  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r >= head).sort((a, b) => a - b);

  let sequence = [head];

  if (direction === "LEFT") {
    sequence.push(...left.reverse(), ...right);
  } else {
    sequence.push(...right, ...left.reverse());
  }

  return { sequence, seekTime: calculateSeekTime(sequence) };
};

// C-LOOK
export const clook = (requests, head, direction) => {
  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r >= head).sort((a, b) => a - b);

  let sequence = [head];

  if (direction === "RIGHT") {
    sequence.push(...right, ...left);
  } else {
    sequence.push(...left.reverse(), ...right.reverse());
  }

  return { sequence, seekTime: calculateSeekTime(sequence) };
};