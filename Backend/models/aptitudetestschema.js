import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // multiple options
  correct: { type: String, required: true }, // store correct answer
});

const aptitudeTestSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Aptitude Test 1"
  questions: [questionSchema],
  duration: { type: Number, default: 120 }, // in seconds (default 2 min)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AptitudeTest", aptitudeTestSchema);
