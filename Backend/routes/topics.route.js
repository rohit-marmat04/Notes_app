import express from 'express';
import { getAllTopics } from '../controllers/topics.controller.js';

const topicRouter = express.Router();

topicRouter.get('/alltopics', getAllTopics); // GET /api/topics/alltopics

export default topicRouter;
