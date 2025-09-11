import mongoose from 'mongoose';

const learningCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  buttonText: String,
  slug: String
});

export default mongoose.model('LearningCard', learningCardSchema);