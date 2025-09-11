import express from "express";
import { getTemplate, updateTemplate, deleteTemplate, deleteTopicFromTemplate, updateTopicInTemplate, addTopicToTemplate, getAllTemplates } from "../controllers/template.controller.js"

const templateRouter = express.Router();

templateRouter.get("/:slug", getTemplate);
templateRouter.post("/updatetemplate", updateTemplate);
templateRouter.delete('/:slug', deleteTemplate);
templateRouter.delete(':slug/topic/delete', deleteTopicFromTemplate);
templateRouter.put(':slug/topic/update', updateTopicInTemplate);
templateRouter.post(':slug/topic/add', addTopicToTemplate);
templateRouter.get("/", getAllTemplates);   // ✅ all templates

export default templateRouter;