import { useState } from "react";
import InputForm from "../components/InputForm";
import AlgorithmSelector from "../components/AlgorithmSelector";
import Graph from "../components/Graph";
import ResultDisplay from "../components/ResultDisplay";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { HardDrive } from 'lucide-react';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Simulator = () => {
  const [requests, setRequests] = useState([]);
  const [head, setHead] = useState(50);
  const [algo, setAlgo] = useState("FCFS");
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState("RIGHT");
  const [resetTrigger, setResetTrigger] = useState(0);

  const navigate = useNavigate();

  const runSimulation = async () => {
    if (!requests.length) return alert("Enter requests!");

    try {
      const res = await axios.post(`${backendUrl}/api/simulate`, {
        requests,
        head,
        direction,
        algorithm: algo,
      });
      setResult(res.data);
    } catch {
      alert("Error running simulation");
    }
  };

  const handleSave = async () => {
    if (!result) return;
    await axios.post(`${backendUrl}/api/save`, {
      requests,
      head,
      direction,
      algorithm: algo,
      result
    });
    alert("Saved!");
  };

  const handleReset = () => {
  setRequests([]);
  setHead(50);
  setDirection("RIGHT");
  setAlgo("FCFS");
  setResult(null);
  setResetTrigger(prev => prev + 1);
};

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* NAVBAR */}
      <div className="shadow-[0_3px_10px_rgb(0,0,0,0.1)] flex items-center justify-between px-4 sm:px-8 py-3 bg-white">
        <div className="flex items-center gap-3">
          <HardDrive className="w-8 h-8 p-1 rounded bg-black flex items-center justify-center text-white" />
          <div>
            <h1 className="text-sm font-semibold">
              Disk Scheduling Visualizer
            </h1>
            <p className="text-[10px] text-gray-400 tracking-widest hidden sm:block">
              FCFS · SSTF · SCAN · C-SCAN · LOOK · C-LOOK
            </p>
          </div>
        </div>

        <NavLink to="https://vinay-portfolio-three-chi.vercel.app" className="w-fit p-3 sm:w-25 cursor-pointer bg-black text-white py-2 rounded-md text-sm">
          Contact Me
        </NavLink>
      </div>

      {/* HERO */}
      <div className="px-4 sm:px-10 pt-6 pb-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
          Simulate disk head movement.
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl">
          Enter a request queue, choose an algorithm, and watch the head traverse the disk. Save the History.
        </p>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-10 pb-10">

        {/* LEFT PANEL */}
        <div className="w-full lg:w-95 mt-2 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-5 space-y-5">

          <div className="flex justify-between items-center">
            <h2 className="font-medium">Inputs</h2>
            <span className="text-[10px] text-gray-400">CONFIG</span>
          </div>

          <InputForm
            setRequests={setRequests}
            setHead={setHead}
            setDirection={setDirection}
            resetTrigger={resetTrigger}
          />

          <AlgorithmSelector setAlgo={setAlgo} />

          <button
            onClick={runSimulation}
            className="w-full bg-black cursor-pointer text-white py-2 rounded-md text-sm"
          >
            ▶ Run Simulation
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 border cursor-pointer py-2 rounded-md text-sm"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 border cursor-pointer py-2 rounded-md text-sm"
            >
              Save
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1">

          {/* Tabs */}
          <div className="flex flex-wrap mt-2 gap-2 mb-3">
            <button className="px-4 py-1 bg-white border rounded-md text-sm">
              Result
            </button>
            <button
              onClick={() => navigate("/history")}
              className="px-4 py-1 bg-white border cursor-pointer rounded-md text-sm"
            >
              History
            </button>
          </div>

          {/* Graph Box */}
          <div className="bg-white mt-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl h-75 sm:h-100 lg:h-112.5 flex items-center justify-center bg-grid overflow-hidden">

            {result ? (
              <div className="w-full p-2 sm:p-4">
                <ResultDisplay result={result} />
                <Graph sequence={result.sequence} />
              </div>
            ) : (
              <div className="text-center text-gray-400 text-sm">
                Run a simulation to begin
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Simulator;