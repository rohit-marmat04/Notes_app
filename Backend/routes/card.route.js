import express from 'express';
import {
  createCard,
  getCards,
  updateCard,
  deleteCard
} from '../controllers/card.controller.js';
import { verifyAdmin } from '../middleware/auth.js'; // for admin-only

const cardRouter = express.Router();

cardRouter.get('/getcard', getCards);
cardRouter.post('/createcard', verifyAdmin, createCard);
cardRouter.put('/updatecard', verifyAdmin, updateCard);
cardRouter.delete('/deletecard/:id', verifyAdmin, deleteCard);

export default cardRouter;