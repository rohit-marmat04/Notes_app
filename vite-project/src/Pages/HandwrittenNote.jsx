import React, { useState, useEffect } from "react";
import axios from "axios";

const HandwrittenNote = () => {
  const [formData, setFormData] = useState({
    college: "",
    course: "",
    semester: "",
    subject: "",
    noteTitle: "",
    driveLink: ""
  });

  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://notes-app-1-3rxs.onrender.com/api/notes/gethandwrittennotesbyfilters");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://notes-app-1-3rxs.onrender.com/api/notes/uploadhandwrittennotes", // your backend route
        formData
      );
      setMessage(res.data.message);
      setFormData({
        college: "",
        course: "",
        semester: "",
        subject: "",
        noteTitle: "",
        driveLink: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding note");
    }
  };

  // Load all notes initially
    useEffect(() => {
      fetchNotes();
    }, []);

  // Handle note delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await axios.delete(`https://notes-app-1-3rxs.onrender.com/api/notes/deletehandwritten/${id}`);
      setMessage(res.data.message);
      console.log(message);
      fetchNotes(); // refresh list after delete
    } catch (err) {
      console.error("Error deleting note:", err);
      setMessage(err.response?.data?.message || "Error deleting note");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Handwritten Note</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="College"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="noteTitle"
          value={formData.noteTitle}
          onChange={handleChange}
          placeholder="Note Title"
          className="border p-2 w-full"
          required
        />
        <input
          type="url"
          name="driveLink"
          value={formData.driveLink}
          onChange={handleChange}
          placeholder="Google Drive Link"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Add Note
        </button>
      </form>

            {/* Notes List */}
      <h2 className="text-lg font-semibold mb-2">All Handwritten Notes</h2>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{note.noteTitle}</h3>
                <p className="text-sm text-gray-600">
                  {note.subject} | Sem {note.semester} | {note.course} | {note.college}
                </p>
                <a
                  href={note.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Note
                </a>
              </div>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HandwrittenNote;
