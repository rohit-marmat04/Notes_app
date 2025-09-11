import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

export default function NoteViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [otherNotes, setOtherNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchNote = async (noteId) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/notes/${noteId}`);
      const noteData = res.data;

      setNote(noteData);

      if (noteData.noteType === "text") {
        const filePath = noteData.filePath.replace(/\\/g, "/");
        const textRes = await axios.get(`http://localhost:5000/${filePath}`);
        setTextContent(textRes.data);
      } else {
        setTextContent("");
      }

      const otherRes = await axios.get(
        `http://localhost:5000/api/notes/bysubject?subject=${noteData.subject}`
      );
      setOtherNotes(otherRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading note:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setNote(null);
      setTextContent("");
      fetchNote(id);
    }
  }, [id]);

  if (loading || !note) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <section className="bg-gray-800 min-h-screen">
      <Navbar />

      <div className="flex gap-6 max-w-8xl mx-auto mt-4 relative">
        {/* Sidebar Toggle Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-2 left-2 z-20 bg-gray-100 p-2 rounded shadow"
          >
            <IoMenu size={20} />
          </button>
        )}

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-gray-900 border rounded-lg p-4 shadow-sm h-fit relative transition-all duration-300">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-2 right-2 text-gray-100 hover:text-gray-400"
            >
              <FaArrowLeft size={18} />
            </button>

            <h3 className="font-semibold mb-3 text-lg text-white border-b pb-2 mt-6">
              Chapters
            </h3>
            <ul className="space-y-2">
              {otherNotes.map((n) => (
                <li
                  key={n._id}
                  className={`cursor-pointer p-2 text-white rounded hover:bg-gray-500 ${
                    n._id === id ? "bg-blue-500 font-medium" : ""
                  }`}
                  onClick={() => navigate(`/notes/${n._id}`)}
                >
                  {n.noteTitle}
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 pl-13 bg-gray-900 shadow rounded-lg p-6 transition-all duration-300">
          {/* Note Title */}
          <h2 className="text-2xl text-white font-bold mb-2">{note.noteTitle}</h2>
          <p className="text-white border-b pb-2 mb-6">Subject: {note.subject}</p>

          {/* Note Content */}
          {note.noteType === "text" ? (
            <div className="prose max-w-none text-white">
              {textContent.split("\n").map((line, idx) => {
                // Detect code-like lines
                if (
                  line.trim().startsWith("#") ||
                  line.trim().match(/^[a-zA-Z0-9_]+\s*=/)
                ) {
                  return (
                    <pre
                      key={idx}
                      className="bg-gray-900 text-white p-3 rounded mb-3 overflow-x-auto"
                    >
                      <code>{line}</code>
                    </pre>
                  );
                }
                return <p key={idx}>{line}</p>;
              })}
            </div>
          ) : (
            <div className="text-center">
              <a
                href={`http://localhost:5000/${note.filePath.replace(/\\/g, "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Handwritten Notes
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}