import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LearningPathCard = ({ title, description, buttonText, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/template/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }} // ✅ hover for desktop
      whileTap={{ scale: 0.97 }} // ✅ tap for mobile
      className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 
                 rounded-2xl shadow-md hover:shadow-xl 
                 hover:shadow-emerald-400/20 p-6 flex flex-col 
                 justify-between min-h-[140px] sm:min-h-[180px] 
                 md:min-h-[200px] border border-gray-600 
                 hover:border-gray-200 transition-all duration-300"
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white tracking-wide">
          {title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }} // ✅ nice press effect on mobile
        className="mt-5 self-start bg-gray-200 hover:bg-white 
                   text-black font-medium px-4 sm:px-5 py-2 rounded-full 
                   text-sm sm:text-base flex items-center gap-2 
                   transition-all duration-300 shadow-md 
                   hover:shadow-emerald-500/50"
      >
        {buttonText} <span className="text-lg">↗</span>
      </motion.button>
    </motion.div>
  );
};

export default LearningPathCard;
