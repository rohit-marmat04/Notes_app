import express from "express";
import { 
  addProblem, 
  getProblems, 
  getProblemById, 
  updateProblem, 
  deleteProblem 
} from "../controllers/problem.controller.js";

const ProblemRouter = express.Router();

ProblemRouter.post("/", addProblem);
ProblemRouter.get("/", getProblems);
ProblemRouter.get("/:id", getProblemById);
ProblemRouter.put("/:id", updateProblem);
ProblemRouter.delete("/:id", deleteProblem);

export default ProblemRouter;