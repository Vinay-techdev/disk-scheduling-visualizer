import express from "express";
import {
  simulate,
  saveSimulation,
  getHistory,
} from "../controllers/simulationController.js";

const router = express.Router();

router.post("/simulate", simulate);
router.post("/save", saveSimulation);
router.get("/history", getHistory);

export default router;