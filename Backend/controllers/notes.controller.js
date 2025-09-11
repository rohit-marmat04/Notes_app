import Note from '../models/notes.model.js'
import fs from 'fs';
import path from 'path';
import Template from '../models/Content.template.model.js'
import HandwrittenNote from '../models/handwritten.model.js';

export const uploadTextNote = async (req, res) => {
  const { college, course, semester, subject, noteTitle } = req.body;
  const file = req.file;

  const newNote = new Note({
    college,
    course,
    semester,
    subject,
    noteType: 'text',
    noteTitle,
    fileType: path.extname(file.originalname),
    filePath: file.path,
  });

  await newNote.save();
  res.json({ success: true, note: newNote });
};

export const getNotes = async (req, res) => {
  const filters = req.query;
  const notes = await Note.find(filters);
  res.json(notes);
};

export const getNoteFile = async (req, res) => {
 try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const filePath = path.resolve(note.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Serve text files
    if (note.noteType === 'text' && note.fileType === '.txt') {
      res.setHeader('Content-Type', 'text/plain');
      return res.sendFile(filePath);
    }

    // Serve PDF files
    if (note.fileType === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      return res.sendFile(filePath);
    }

    res.status(400).json({ message: 'Unsupported file type' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// In noteController.js
export const getNoteByFilters = async (req, res) => {

  try {
    const { college, course, semester, subject, noteType } = req.query;
    console.log('Filters received:', { college, course, semester, subject, noteType });

    const note = await Note.findOne({
      college,
      course,
      semester: parseInt(semester),
      subject,
      noteType,
    });

    console.log('Found note:', note);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ noteId: note._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getNotesBySubject = async (req, res) => {
  try {
    const subject = req.query.subject;

    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    const notes = await Note.find({ subject }).select("_id noteTitle");
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes by subject:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new handwritten note
export const addHandwrittenNote = async (req, res) => {
  try {
    const { college, course, semester, subject, noteTitle, driveLink } = req.body;

    if (!college || !course || !semester || !subject || !noteTitle || !driveLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNote = new HandwrittenNote({
      college,
      course,
      semester,
      subject,
      noteTitle,
      driveLink
    });

    await newNote.save();
    res.status(201).json({ message: "Handwritten note added successfully", note: newNote });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all handwritten notes
export const getAllHandwrittenNotes = async (req, res) => {
  try {
    const notes = await HandwrittenNote.find().sort({ uploadedAt: -1 }); // latest first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get handwrittenNotes by filters
export const getHandwrittenNoteByFilter = async (req, res) => {
  try {
    const filters = req.query; // example: /api/handwritten?college=ABC&semester=6
    const notes = await HandwrittenNote.find(filters).sort({ uploadedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteHandwrittenNote = async (req, res) => {
  try {
    const { id } = req.params; // noteId from URL

    const deletedNote = await HandwrittenNote.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Handwritten note deleted successfully", note: deletedNote });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getNoteByTagName = async (req, res) => {
  try {
    const { tagname } = req.query; // ✅ query param से पढ़ेगा

    if (!tagname) {
      return res.status(400).json({ message: "Tag Name is required" });
    }

    const note = await Note.findOne({
      noteTitle: { $regex: new RegExp(`^${tagname}$`, 'i') },
      noteType: "text"
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found or not text type" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
