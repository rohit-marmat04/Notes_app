import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkMermaid } from "@theguild/remark-mermaid";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

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
      const res = await axios.get(`https://notes-app-1-3rxs.onrender.com/api/notes/${noteId}`);
      const noteData = res.data;

      setNote(noteData);

      if (noteData.noteType === "text") {
        const filePath = noteData.filePath.replace(/\\/g, "/");
        const textRes = await axios.get(`https://notes-app-1-3rxs.onrender.com/${filePath}`);
        setTextContent(textRes.data);
      } else {
        setTextContent("");
      }

      const otherRes = await axios.get(
        `https://notes-app-1-3rxs.onrender.com/api/notes/bysubject?subject=${noteData.subject}`
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
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-2 left-2 z-20 bg-gray-100 p-2 rounded shadow"
          >
            <IoMenu size={20} />
          </button>
        )}

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

        <div className="flex-1 pl-13 bg-gray-900 shadow rounded-lg p-6 transition-all duration-300">
          <h2 className="text-2xl text-white font-bold mb-2">{note.noteTitle}</h2>
          <p className="text-white border-b pb-2 mb-6">Subject: {note.subject}</p>

          {note.noteType === "text" ? (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                  remarkMath,
                  [
                    remarkMermaid,
                    {
                      mermaidOptions: {
                        theme: "base", // allows full color customization
                        themeVariables: {
                          primaryColor: "#ffffff",       // node background
                          secondaryColor: "#000000",     // node border
                          tertiaryColor: "#000000",      // text color
                          edgeLabelBackground: "#ffffff" // edge label background
                        },
                      },
                    },
                  ],
                ]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold text-blue-400 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-semibold text-blue-300 mt-4 mb-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold text-blue-200 mt-3 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-100 mb-3 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside mb-3 text-gray-100" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside mb-3 text-gray-100" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-yellow-300" {...props} />
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      className="my-4 mx-auto rounded-lg shadow-lg border border-gray-700"
                      alt={props.alt || "Image"}
                    />
                  ),
                  table: ({node, ...props}) => (
      <table className="table-auto border-collapse border border-gray-700 mb-4" {...props} />
    ),
    th: ({node, ...props}) => (
      <th className="border border-gray-700 px-4 py-2 text-white bg-gray-800" {...props} />
    ),
    td: ({node, ...props}) => (
      <td className="border border-gray-700 px-4 py-2 text-white" {...props} />
    ),
                }}
              >
                {textContent}
              </ReactMarkdown>
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
