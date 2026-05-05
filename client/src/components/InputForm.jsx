import { useState, useEffect } from "react";

const InputForm = ({ setRequests, setHead, setDirection, resetTrigger }) => {
  const [input, setInput] = useState("");
  const [headVal, setHeadVal] = useState(50);
  const [directionVal, setDirectionVal] = useState("RIGHT");

  useEffect(() => {
    setInput("");
    setHeadVal(50);
    setDirectionVal("RIGHT");

    setRequests([]);
    setHead(50);
    setDirection("RIGHT");
  }, [resetTrigger]);

  const handleRequests = (value) => {
    setInput(value);

    const arr = value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

    setRequests(arr);
  };

  const handleHead = (value) => {
    setHeadVal(value);
    setHead(Number(value));
  };

  return (
    <div className="space-y-4">

      <div>
        <label className="text-[10px] text-gray-400">
          REQUEST QUEUE
        </label>
        <input
          value={input}
          onChange={(e) => handleRequests(e.target.value)}
          className="mt-1 border rounded-md px-3 py-2 w-full bg-gray-50"
          placeholder="eg.. 83, 34, 45"
          required
        />
      </div>

      <div>
        <label className="text-[10px] text-gray-400">
          HEAD POSITION
        </label>
        <input
          type="number"
          value={headVal}
          onChange={(e) => handleHead(e.target.value)}
          className="mt-1 border rounded-md px-3 py-2 w-full bg-gray-50"
        />
      </div>

      <div>
        <label className="text-[10px] text-gray-400">
          DIRECTION
        </label>
        <select
          value={directionVal}
          onChange={(e) => {
            setDirectionVal(e.target.value);
            setDirection(e.target.value);
          }}
          className="mt-1 border rounded-md px-3 py-2 w-full bg-gray-50"
        >
          <option value="RIGHT">RIGHT</option>
          <option value="LEFT">LEFT</option>
        </select>
      </div>

    </div>
  );
};

export default InputForm;