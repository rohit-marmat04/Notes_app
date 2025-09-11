// models/Problem.js
import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  examples: String,
  constraints: String,
  hints: String,
  approaches: String,
  code: {
    c:{ type: String },
    cpp: { type: String },
    java: { type: String },
    python: { type: String },
  }
});

export default mongoose.model("Problem", ProblemSchema);