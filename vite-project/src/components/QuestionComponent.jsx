import { useState } from 'react';

const QuestionComponent = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const correctAnswer = data.options[data.correctIndex];
  const [showSolution, setShowSolution] = useState(false);

  const handleOptionClick = (opt) => {
    if (!selected) setSelected(opt);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  return (
  <section>
   <div className="flex justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 min-h-auto">
  <div
    key={data._id}
    className="p-5 sm:p-6 border border-gray-700 rounded-2xl bg-gray-800 shadow-xl lg:w-[900px] w-full transition-transform hover:scale-[1.01] hover:border-gray-400 "
  >
    {/* Question */}
    <p className="font-semibold mb-5 text-white text-base sm:text-lg lg:text-xl leading-relaxed">
      {data.question}
    </p>

    {/* Options */}
    <div className="space-y-3">
      {data.options.map((opt, i) => {
        const showCorrect =
          selected === opt &&
          opt.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        const showWrong = selected === opt && !showCorrect;

        return (
          <button
            key={i}
            onClick={() => handleOptionClick(opt)}
            disabled={!!selected}
            className={`w-full text-left px-4 py-3 rounded-xl flex justify-between items-center 
              text-sm sm:text-base lg:text-lg font-medium shadow-md transition-all duration-300
              ${
                showCorrect
                  ? "bg-green-100 border border-green-500 text-green-800"
                  : showWrong
                  ? "bg-red-100 border border-red-500 text-red-800"
                  : "bg-gray-700 border border-gray-600 text-white hover:bg-gray-600 hover:border-gray-400"
              }`}
          >
            {opt}
            {showCorrect && <span className="ml-2">✅</span>}
            {showWrong && <span className="ml-2">❌</span>}
          </button>
        );
      })}
    </div>

    {/* Solution Section */}
    <div className="mt-6">
      {!showSolution ? (
        <button
          onClick={handleShowSolution}
          className="text-sm sm:text-base text-blue-400 hover:text-blue-300 underline transition"
        >
          Show Solution
        </button>
      ) : (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <p className="text-green-400 font-semibold text-sm sm:text-base lg:text-lg">
            ✅ Correct Answer:{" "}
            <span className="underline text-white">{correctAnswer}</span>
          </p>
        </div>
      )}
    </div>
  </div>
</div>

    </section>
  );
};

export default QuestionComponent;
