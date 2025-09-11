import mongoose from "mongoose";

const handwrittenNoteSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  noteTitle: {
    type: String,
    required: true,
    trim: true
  },
  driveLink: {
    type: String,
    required: true,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("HandwrittenNote", handwrittenNoteSchema);
