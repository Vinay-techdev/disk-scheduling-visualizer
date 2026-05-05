const ResultDisplay = ({ result }) => {
  return (
    <div className="mb-2 text-sm">
      <p><strong>Sequence:</strong> {result.sequence.join(" → ")}</p>
      <p><strong>Seek Time:</strong> {result.seekTime}</p>
    </div>
  );
};

export default ResultDisplay;