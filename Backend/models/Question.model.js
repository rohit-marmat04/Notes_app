import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  topic: String,
  category: String,
  question: String,
  options: [String],
  solution: String,
  correctIndex: Number,
});

export default mongoose.model("Question", QuestionSchema);