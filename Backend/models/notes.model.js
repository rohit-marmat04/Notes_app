import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  college: String,
  course: String,
  semester: Number,
  subject: String,
  noteType: { type: String, enum: ['text', 'handwritten'] },
  noteTitle: String,
  fileType: String,
  storageUrl: String, // For handwritten (Drive) or S3
  filePath: String, // For text notes stored on server
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Note', noteSchema);