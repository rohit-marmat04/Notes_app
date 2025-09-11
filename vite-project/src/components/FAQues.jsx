import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "./Navbar";

const faqs = [
  {
    question: "What is Noteshala?",
    answer: "Noteshala is a platform for college students to access handwritten notes, text notes, and aptitude preparation quizzes."
  },
  {
    question: "Is Noteshala free to use?",
    answer: "Yes! All notes and quizzes are freely available to help students with their preparation."
  },
  {
    question: "Can I contribute my own notes?",
    answer: "Currently, contribution is limited. Soon, students will be able to upload and share their own notes."
  },
  {
    question: "Do you provide aptitude practice?",
    answer: "Yes, we provide quizzes and practice questions for aptitude and interview preparation."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach us through the Contact page form, and we will respond via email."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" mx-auto h-screen w-full bg-gray-800">
        <Navbar/> 
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 mt-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 lg:max-w-3xl lg:ml-100">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-900 text-white rounded-2xl shadow-md p-4 cursor-pointer border hover:shadow-lg transition"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-100" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-100" />
              )}
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-white"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
