import express from 'express';
import {
  uploadTextNote,
  getNotes,
  getNoteFile,
  getNoteByFilters,
  getNotesBySubject,
  getNoteById,
  addHandwrittenNote,
  getHandwrittenNoteByFilter,
  getNoteByTagName,
  deleteHandwrittenNote
} from '../controllers/notes.controller.js';
import { upload } from '../middleware/uploadMiddleware.js';

const notesRouter = express.Router();

// Upload
notesRouter.post('/upload', upload.single('file'), uploadTextNote);

// Specific routes pehle
notesRouter.get('/file/:id', getNoteFile);
notesRouter.get('/bysubject', getNotesBySubject);
notesRouter.get('/getnotebyfilters', getNoteByFilters);
notesRouter.post('/uploadhandwrittennotes', addHandwrittenNote);
notesRouter.get('/gethandwrittennotesbyfilters', getHandwrittenNoteByFilter);
notesRouter.get('/getnotebytagname', getNoteByTagName);
notesRouter.delete('/deletehandwritten/:id', deleteHandwrittenNote);

// Get note by ID
notesRouter.get('/:id', getNoteById);

// Get all notes
notesRouter.get('/', getNotes);

export default notesRouter;
