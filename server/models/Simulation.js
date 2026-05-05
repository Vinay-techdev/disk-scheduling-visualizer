import mongoose from "mongoose";

const simulationSchema = new mongoose.Schema(
  {
    requests: [Number],
    head: Number,
    direction: String,
    algorithm: String,
    sequence: [Number],
    seekTime: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Simulation || mongoose.model("Simulation", simulationSchema);