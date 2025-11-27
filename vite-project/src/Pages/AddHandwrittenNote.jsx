import React, { useState } from "react";
import axios from "axios";

const AddHandwrittenNote = () => {
  const [form, setForm] = useState({
    college: "",
    course: "",
    semester: "",
    subject: "",
    noteTitle: "",
    driveLink: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://notes-app-1-3rxs.onrender.com/api/handwritten", form);
      setMessage(res.data.message);
      setForm({
        college: "",
        course: "",
        semester: "",
        subject: "",
        noteTitle: "",
        driveLink: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding note");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Handwritten Note</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="college" value={form.college} onChange={handleChange} placeholder="College" className="border p-2 w-full" required />
        <input type="text" name="course" value={form.course} onChange={handleChange} placeholder="Course" className="border p-2 w-full" required />
        <input type="number" name="semester" value={form.semester} onChange={handleChange} placeholder="Semester" className="border p-2 w-full" required />
        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="border p-2 w-full" required />
        <input type="text" name="noteTitle" value={form.noteTitle} onChange={handleChange} placeholder="Note Title" className="border p-2 w-full" required />
        <input type="url" name="driveLink" value={form.driveLink} onChange={handleChange} placeholder="Google Drive Link" className="border p-2 w-full" required />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Note
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};

export default AddHandwrittenNote;
