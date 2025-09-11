import React, { useEffect, useState } from "react";
import LearningPathSection from "./LearningPathSection";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();
  // 5s per item
const items = [
  { emoji: "📚", text: "College Notes", grad: "from-orange-500 via-purple-500 to-cyan-400" },
  { emoji: "💻", text: "DSA Skills", grad: "from-pink-500 via-red-500 to-yellow-500" },
  { emoji: "🧩", text: "Problem Solving", grad: "from-green-400 via-blue-500 to-purple-500" },
  { emoji: "🧮", text: "Aptitude Preparation", grad: "from-yellow-400 via-orange-500 to-red-500" },
  { emoji: "✍️", text: "Exam Preparation", grad: "from-pink-500 via-red-500 to-yellow-500" },
];

  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleResources = () =>{
    navigate("/gethand");
  }

  return (
    <section className="relative overflow-hidden bg-[#0f1115] text-white px-4 py-20 md:py-28">
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-purple-500/40 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 w-[360px] h-[360px] rounded-full bg-orange-500/40 blur-[90px]" />
      {/* dotted grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* fixed small caption */}
        <p className="mb-2 text-sm font-medium tracking-wide text-gray-400">
          Advance Your Career with
        </p>

        {/* MAIN HEADLINE with fixed prefix + sliding word */}
        <h1 className="mx-auto flex flex-wrap justify-center gap-x-3 text-3xl font-extrabold leading-tight md:text-6xl">
          <span>Advance Your Career with</span>

          {/* animated word: wrapper keeps height, inner slides up */}
          <span className="relative inline-block h-[1.2em] overflow-hidden align-baseline">
            <span
              key={items[i].text}
              className={`inline-block bg-gradient-to-r ${items[i].grad} bg-clip-text text-transparent animate-[slideUp_.6s_ease-out]`}
            >
               {/* Emoji in normal color */}
    <span className={`mr-1${items[i].emoji}`}></span> 
    {/* Text in gradient */}
    <span
      className={`bg-gradient-to-r ${items[i].grad} bg-clip-text text-transparent`}
    ></span>
              {" "}{items[i].text}
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Master DSA with curated resources and expert guidance — learn the skills that set you apart and join the Top 1% of coding achievers!
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button type="button" className="rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 px-6 py-3 font-bold shadow-lg transition-transform hover:scale-105" onClick={()=>{
            const target = document.getElementById("learning-path-section");
            if(target){
              target.scrollIntoView({ behavior : "smooth" });
            }
          }}>
            Start for Free
          </button>
          <a href="#" className="rounded-lg border border-white/20 px-6 py-3 font-bold transition hover:bg-white/10" onClick={handleResources}>
            Resources
          </a>
        </div>
      </div>

      {/* keyframes (Tailwind inline) */}
      <style>{`
        @keyframes slideUp {
          0%   { transform: translateY(100%); opacity: .0; }
          35%  { opacity: 1; }
          100% { transform: translateY(0%);  opacity: 1; }
        }
      `}</style>
      <LearningPathSection />
    </section>
  );
}