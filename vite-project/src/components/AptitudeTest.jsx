import React, { useState, useEffect } from "react";
import axios from "axios";

const AptitudeTest = ({ testTitle }) => {
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/test/gettestbytitle/${testTitle}`
        );
        setTest(res.data);

        // 🔥 Set timer from test duration (in seconds)
        if (res.data.duration) {
          setTimeLeft(res.data.duration);
        }
      } catch (err) {
        console.error("Error fetching test:", err);
      }
    };
    fetchTest();
  }, [testTitle]);

  // ✅ Timer
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // ✅ Auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && test && !submitted) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQ]: option });
  };

  const handleNext = () => {
    if (currentQ < test.questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/test/submit", {
        testTitle,
        answers,
      });
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting test:", err);
    }
  };

  // ✅ Search inside test by question text
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError("");

    if (!searchTitle.trim()) return;

    const index = test.questions.findIndex((q) =>
      q.question.toLowerCase().includes(searchTitle.toLowerCase())
    );

    if (index !== -1) {
      setCurrentQ(index);
    } else {
      setSearchError("Question not found in this test.");
    }
  };

  if (!test) {
    return <p className="text-center mt-6 text-gray-300">Loading test...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-gray-800 shadow-lg rounded-xl mt-20 w-[95%] sm:w-full">
      <h1 className="text-white text-xl sm:text-2xl font-bold mb-4 text-center">
        {test.title}
      </h1>

      {!submitted ? (
        <>
          {/* Timer */}
          <p className="text-base sm:text-lg font-semibold text-gray-300 text-center">
            Time Left: {Math.floor(timeLeft / 60)}:
            {("0" + (timeLeft % 60)).slice(-2)}
          </p>

          {/* 🔍 Search Question */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 mt-4"
          >
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search question"
              className="flex-1 px-3 py-2 border rounded-lg w-full text-sm sm:text-base text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black rounded-lg w-full sm:w-auto text-sm sm:text-base"
            >
              Search
            </button>
          </form>
          {searchError && (
            <p className="text-red-600 mt-2 text-sm">{searchError}</p>
          )}

          {/* Question */}
          <div className="mt-4">
            <h2 className="text-white text-lg sm:text-xl font-semibold text-left">
              Q{currentQ + 1}. {test.questions[currentQ].question}
            </h2>
            <div className="mt-3 space-y-2">
              {test.questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={`block w-full py-2 px-3 rounded-lg border text-sm sm:text-base transition 
                    ${
                      answers[currentQ] === opt
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-200"
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentQ === 0}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Prev
            </button>
            {currentQ < test.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full sm:w-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg w-full sm:w-auto"
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="mt-6 text-center">
          <h2 className="text-white text-lg sm:text-xl font-bold">
            Test Submitted ✅
          </h2>
          <p className="text-white text-base sm:text-lg">
            Score: {result?.score} / {result?.totalQuestions}
          </p>
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
