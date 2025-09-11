import Question from '../models/Question.model.js';

export const getQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.query;
    const questions = await Question.find({ topic });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { topic, category, question, options, solution, correctIndex } = req.body;

    if (!topic || !category || !question || !options || !solution || correctIndex === undefined) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newQuestion = new Question({
      topic,
      category,
      question,
      options,
      solution,
      correctIndex,
    });
    
    await newQuestion.save();
    res.status(201).json({ success: true, message: 'Question added' });
    console.log("Question added successfully:", newQuestion)
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to add question', details: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ success: true, message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};