import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProblemViewer() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState("java"); // default tab

  useEffect(() => {
    axios
      .get(`https://notes-app-1-3rxs.onrender.com/api/problems/${id}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setProblem(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading problem...</div>;
  if (!problem) return <div className="text-center text-red-400">Problem not found</div>;

  // code object
  const codes = problem.code || {};

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">{problem.title}</h1>
        <p className="text-lg mb-4">{problem.description}</p>

        {/* Tabs for languages */}
        <div className="flex gap-2 mb-4">
          {["c", "cpp", "java", "python"].map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-2 rounded-lg ${
                activeLang === lang ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Show selected language code */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-400">Code ({activeLang.toUpperCase()})</h2>
          <pre className="bg-gray-700 p-3 rounded-lg overflow-x-auto">
            {codes[activeLang] || "// Code not available"}
          </pre>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-green-400">Example</h2>
          <pre className="bg-gray-700 p-3 rounded-lg">{problem.examples}</pre>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-yellow-400">Constraints</h2>
          <p>{problem.constraints}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-pink-400">Approaches</h2>
          <p>{problem.approaches}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-400">Hints</h2>
          <p>{problem.hints}</p>
        </div>
      </div>
    </div>
  );
}
