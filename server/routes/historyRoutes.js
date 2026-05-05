import express from "express";
import {
  saveSimulation,
  getHistory,
  deleteSimulation,
} from "../controllers/historyController.js";

const router = express.Router();

router.post("/save", saveSimulation);
router.get("/history", getHistory);
router.delete("/history/:id", deleteSimulation);

export default router;