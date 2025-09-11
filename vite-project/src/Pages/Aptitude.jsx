import React from "react";

const topics = [
  "HCF and LCM",
  "Number System",
  "Number Decimals & Fractions",
  "Surds and Indices",
  "Divisibility",
  "Ages",
  "LCM",
  "HCF",
  "Inverse",
];

const AptitudePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-green-700 text-white py-4 px-6 text-center text-xl font-bold">
        Important Aptitude Topics For Campus Placements
      </div>

      {/* Banner */}
      <div className="bg-white p-4 text-center shadow-md">
        <h2 className="text-lg font-semibold">Most Important Aptitude Topics For Placements</h2>
        <p className="text-sm text-gray-600 mt-2">
          Start your aptitude preparation for various Service and Product Based companies here.
        </p>
      </div>

      {/* Sections */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-semibold mb-2">Aptitude is divided into:</h3>
        <ul className="list-disc list-inside text-blue-600">
          <li>Quantitative Aptitude</li>
          <li>Logical Reasoning</li>
          <li>Verbal Ability</li>
        </ul>
      </div>

      {/* Quants Section */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-bold mb-2">Most Important Aptitude Topics - Quants</h2>
        <p className="text-sm text-gray-600 mb-4">
          These topics test your mathematical ability and are crucial for placement exams.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-semibold text-gray-800">{topic}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Questions</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Formulas</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">How to Solve Quickly</span>
                <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Tricks & Shortcuts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AptitudePage;