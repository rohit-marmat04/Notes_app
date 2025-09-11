import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const TemplatePage = () => {
  const { slug } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/template/${slug}`);
        setTemplate(res.data);
      } catch (err) {
        console.error("Error fetching template:", err);
      }
    };

    fetchTemplate();
  }, [slug]);

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 text-lg">Loading template...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 h-full min-h-screen">
      <Navbar/>
    <div className="w-full mx-auto px-6 py-12 rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 transition-all duration-300">
  {/* Title */}
  <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 mb-8 border-b-4 border-gray-700 pb-4">
    {template.title}
  </h1>

  {/* Description */}
  <p className="text-white text-lg md:text-xl mb-12 leading-relaxed text-center md:text-left">
    {template.description}
  </p>

  {/* Sections */}
  <section className="mb-12">
    <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-2">
      📚 Sections
    </h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {template.sections.map((sec, idx) => (
        <li
          key={idx}
          className="bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 text-indigo-100 px-5 py-3 rounded-lg border border-indigo-400/30 shadow-sm hover:shadow-lg hover:shadow-indigo-400/30 transition-all duration-300"
        >
          {sec}
        </li>
      ))}
    </ul>
  </section>

  {/* Topics */}
  <section>
    <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-2">
      🧠 Topics
    </h2>
    <div className="flex flex-wrap gap-6 justify-start">
      {template.topics.map((topic, idx) => (
        <div
          key={idx}
          className="w-full sm:w-[48%] md:w-[32%] lg:w-[30%] xl:w-[24%] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-gray-200 shadow-md hover:shadow-emerald-400/20 p-6 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
            {topic.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.tags.map((tag, i) => (
              <Link
                key={i}
                to={`/tags/${tag.name}`}
                className="text-sm font-medium px-3 py-1 rounded-full  bg-gray-200 hover:bg-white text-blacktransition-all border border-gray-600  duration-300 hover:scale-105 shadow-md hover:shadow-emerald-500/50"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
</div>
    </div>
  );
};

export default TemplatePage;