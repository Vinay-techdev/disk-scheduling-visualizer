import { useEffect, useState } from "react";

const Graph = ({ sequence }) => {
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(700);

  // hover state
  const [hovered, setHovered] = useState(null);

  const height = 350;
  const padding = 50;
  const max = 200;

  const totalSteps = sequence.length - 1;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setWidth(320);
      else if (window.innerWidth < 1024) setWidth(500);
      else setWidth(700);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    let start;
    const duration = 3000;

    const animate = (t) => {
      if (!start) start = t;
      const pct = Math.min((t - start) / duration, 1);
      setProgress(pct * totalSteps);
      if (pct < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [sequence]);

  const scaleX = (v) => padding + (v / max) * (width - 2 * padding);
  const scaleY = (i) =>
    padding + i * ((height - 2 * padding) / totalSteps);

  const i = Math.floor(progress);
  const j = Math.min(i + 1, totalSteps);
  const t = progress - i;

  const x =
    scaleX(sequence[i]) +
    (scaleX(sequence[j]) - scaleX(sequence[i])) * t;

  const y =
    scaleY(i) +
    (scaleY(j) - scaleY(i)) * t;

  const axisValues = [...new Set([0, 50, 100, 150, 200, ...sequence])].sort(
    (a, b) => a - b
  );

  const filteredAxis = [];
  axisValues.forEach((val) => {
    if (
      filteredAxis.length === 0 ||
      Math.abs(scaleX(val) - scaleX(filteredAxis[filteredAxis.length - 1])) > 35
    ) {
      filteredAxis.push(val);
    }
  });

  return (
    <div className="w-full overflow-x-auto flex justify-center relative">
      
      {/* TOOLTIP */}
      {hovered && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded"
          style={{
            left: hovered.x + 10,
            top: hovered.y - 30,
          }}
        >
          {hovered.value}
        </div>
      )}

      <svg width={width} height={height}>

        {/* Axis */}
        <line
          x1={padding}
          y1={40}
          x2={width - padding}
          y2={40}
          stroke="#444"
          strokeWidth="1.5"
        />

        {/* Axis labels */}
        {filteredAxis.map((val) => (
          <g key={val}>
            <line
              x1={scaleX(val)}
              y1={40}
              x2={scaleX(val)}
              y2={45}
              stroke="#444"
            />
            <text
              x={scaleX(val)}
              y={30}
              fontSize="11"
              textAnchor="middle"
              fill="#ff6b00"
            >
              {val}
            </text>
          </g>
        ))}

        {/* Path */}
        {sequence.map((v, k) =>
          k ? (
            <line
              key={k}
              x1={scaleX(sequence[k - 1])}
              y1={scaleY(k - 1)}
              x2={scaleX(v)}
              y2={scaleY(k)}
              stroke="#ccc"
            />
          ) : null
        )}

        {/* POINTS WITH HOVER */}
        {sequence.map((v, k) => {
          const cx = scaleX(v);
          const cy = scaleY(k);

          return (
            <circle
              key={k}
              cx={cx}
              cy={cy}
              r="5"
              fill="black"
              onMouseEnter={() =>
                setHovered({ x: cx, y: cy, value: v })
              }
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })}

        {/* Moving head */}
        <circle cx={x} cy={y} r="8" fill="blue" />

      </svg>
    </div>
  );
};

export default Graph;