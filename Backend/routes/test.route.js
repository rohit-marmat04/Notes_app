import express from "express";
import {
  createTest,
  getAllTests,
  getTestById,
  submitTest,
  deleteTest,
  getQuestionByTitle
} from "../controllers/test.controller.js";

const testRouter = express.Router();

// Create test
testRouter.post("/create", createTest);

// Get all tests
testRouter.get("/", getAllTests);

// Get test by ID
testRouter.get("/gettestbyid/:id", getTestById);

// Submit test answers
testRouter.post("/submit", submitTest);

// Delete test
testRouter.delete("/:id", deleteTest);

testRouter.get("/gettestbytitle/:title", getQuestionByTitle);

export default testRouter;
