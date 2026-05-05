const AlgorithmSelector = ({ setAlgo }) => {
  return (
    <div>
      <label className="text-xs text-gray-500">ALGORITHM</label>
      <select
        className="input"
        onChange={(e) => setAlgo(e.target.value)}
      >
        <option>FCFS</option>
        <option>SSTF</option>
        <option>SCAN</option>
        <option>C-SCAN</option>
        <option>LOOK</option>
        <option>C-LOOK</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;