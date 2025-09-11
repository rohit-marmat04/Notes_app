import React, { useState, useEffect } from "react";

export default function AnimatedHeadline() {
  const words = [
    { text: "Interview Insights", gradient: "from-orange-500 via-purple-500 to-cyan-400" },
    { text: "DSA Skills", gradient: "from-pink-500 via-red-500 to-yellow-500" },
    { text: "Problem Solving", gradient: "from-green-400 via-blue-500 to-purple-500" },
    { text: "Coding Excellence", gradient: "from-yellow-400 via-orange-500 to-red-500" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 5000); // 5 seconds per word
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center py-12 relative overflow-hidden bg-[#0f1115] text-white">
      <p className="text-gray-400 mb-2">Advance Your Career with</p>

      <h1 className="text-3xl md:text-5xl font-extrabold">
        Advance Your Career with{" "}
        <span
          key={words[index].text}
          className={`bg-gradient-to-r ${words[index].gradient} bg-clip-text text-transparent transition-all duration-1000 ease-in-out`}
        >
          {words[index].text}
        </span>
      </h1>
    </div>
  );
}