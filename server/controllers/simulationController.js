import Simulation from "../models/Simulation.js";
import {
  fcfs,
  sstf,
  scan,
  cscan,
  look,
  clook,
} from "../services/diskAlgorithms.js";

// Run Simulation
export const simulate = async (req, res) => {
  try {
    const { requests, head, direction, algorithm } = req.body;

    let result;

    switch (algorithm) {
      case "FCFS":
        result = fcfs(requests, head);
        break;
      case "SSTF":
        result = sstf(requests, head);
        break;
      case "SCAN":
        result = scan(requests, head, direction);
        break;
      case "C-SCAN":
        result = cscan(requests, head, direction);
        break;
      case "LOOK":
        result = look(requests, head, direction);
        break;
      case "C-LOOK":
        result = clook(requests, head, direction);
        break;
      default:
        return res.status(400).json({ message: "Invalid algorithm" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error running simulation" });
  }
};

// Save to DB
export const saveSimulation = async (req, res) => {
  try {
    const sim = new Simulation(req.body);
    await sim.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Save failed" });
  }
};

// Get History
export const getHistory = async (req, res) => {
  try {
    const data = await Simulation.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};