import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const TopicSchema = new mongoose.Schema({
  title: String,
  tags: [TagSchema],
});

const TemplateSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // example: "aptitude", "logical"
  title: String,
  description: String,
  sections: [String],
  topics: [TopicSchema],
});

export default mongoose.model("Template", TemplateSchema);