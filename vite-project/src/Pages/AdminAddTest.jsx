import React, { useState } from "react";
import axios from "axios";

const AdminAddTest = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(120); // default 2 min
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct: "" },
  ]);

  // Add new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correct: "" },
    ]);
  };

  // Handle question text
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  // Handle option text
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // Handle correct answer
  const handleCorrectChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correct = value;
    setQuestions(updated);
  };

  // Submit test
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/test/create", {
        title,
        duration,
        questions,
      });
      alert("Test Created Successfully ✅");
      setTitle("");
      setDuration(120);
      setQuestions([{ question: "", options: ["", "", "", ""], correct: "" }]);
    } catch (err) {
      console.error("Error creating test:", err);
      alert("Failed to create test ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin - Add Aptitude Test</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Title */}
        <div>
          <label className="block font-semibold mb-1">Test Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-semibold mb-1">Duration (seconds)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Questions */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Questions</h2>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-white">
              <label className="block font-semibold mb-1">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
                className="w-full p-2 border rounded-lg mb-3"
              />

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                    required
                    className="p-2 border rounded-lg"
                  />
                ))}
              </div>

              {/* Correct Answer */}
              <div className="mt-3">
                <label className="block font-semibold mb-1">Correct Answer</label>
                <select
                  value={q.correct}
                  onChange={(e) => handleCorrectChange(qIndex, e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">--Select Correct Answer--</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt || `Option ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            + Add Another Question
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg text-lg"
          >
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddTest;
