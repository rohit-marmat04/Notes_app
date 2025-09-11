import LearningCard from '../models/learningCard.model.js';

export const createCard = async (req, res) => {
  try {
    const newCard = new LearningCard(req.body);
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create card' });
  }
};

export const getCards = async (req, res) => {
  const cards = await LearningCard.find();
  res.json(cards);
};

export const updateCard = async (req, res) => {
  const updated = await LearningCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteCard = async (req, res) => {
  await LearningCard.findByIdAndDelete(req.params.id);
  res.status(204).send();
};