import express from "express";
import { getQuestionsByTopic, deleteQuestion, addQuestion } from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.get("/getquestionbytopic", getQuestionsByTopic);
questionRouter.delete("/deletequestion", deleteQuestion);
questionRouter.post("/addquestion", addQuestion)

export default questionRouter;