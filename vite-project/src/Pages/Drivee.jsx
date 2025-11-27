import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Drivee = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    college: "",
    course: "",
    semester: "",
    subject: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const params = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params[key] = filters[key];
      });

      const res = await axios.get(
        "https://notes-app-1-3rxs.onrender.com/api/notes/gethandwrittennotesbyfilters",
        { params }
      );

      setNotes(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="p-4 md:p-8 bg-gray-900 mt-10 text-white max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Handwritten Notes
        </h2>

        {/* Filter Form */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-3 gap-2 mb-6">
          <input
            type="text"
            name="college"
            placeholder="College"
            value={filters.college}
            onChange={handleChange}
            className="w-full md:w-40 border px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={filters.course}
            onChange={handleChange}
            className="w-full md:w-40 border px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={filters.semester}
            onChange={handleChange}
            className="w-full md:w-32 border px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={filters.subject}
            onChange={handleChange}
            className="w-full md:w-40 border px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchNotes}
            className="w-full md:w-auto bg-white hover:bg-gray-300 text-black font-semibold px-5 py-2 rounded transition"
          >
            Search
          </button>
        </div>

        {/* Notes List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-400">No notes found.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {notes.map((note) => (
              <li
                key={note._id}
                className=" p-4 rounded-lg shadow-md bg-gray-800 hover:shadow-lg border border-gray-600 hover:border-gray-200 transition-all duration-300 "
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {note.noteTitle}
                </h3>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Subject:</strong> {note.subject} |{" "}
                  <strong>Semester:</strong> {note.semester}
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  <strong>College:</strong> {note.college} |{" "}
                  <strong>Course:</strong> {note.course}
                </p>
                <a
                  href={note.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block self-start bg-white hover:bg-white text-black px-3 py-1 rounded text-sm transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
                >
                  View Note
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Drivee;
