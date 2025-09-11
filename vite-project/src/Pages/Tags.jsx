import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import Question from '../components/QuestionComponent.jsx';
import Navbar from '../components/Navbar.jsx';
import AptitudeTest from '../components/AptitudeTest.jsx';

const TagPage = () => {
  const { tagName } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (tagName === "strings" || tagName === "sql" || tagName === "Phases of compiler" || tagName === "Lexical Analysis" || tagName === "Syntax Analysis" || tagName == "Three Address Code") {
          // Notes ke liye redirect
          const res = await axios.get(`http://localhost:5000/api/notes/getnotebytagname?tagname=${tagName}`);
          const noteData = res.data;
          const id = noteData._id;
          navigate(`/notes/${id}`);
        } 
        else if (tagName === "Lcm") {
          // ✅ Is case me kuch fetch nahi karna, AptitudeTest render hoga niche
          setQuestions([]); 
        }
        else {
          // Normal questions
          const res = await axios.get(
            `http://localhost:5000/api/questions/getquestionbytopic?topic=${tagName}`
          );
          setQuestions(res.data);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [tagName, navigate]);

  return (
    <section>
      <Navbar />

      {/* ✅ Agar Ratio Assesment hai to AptitudeTest dikhado */}
      {tagName === "Lcm" ? (
        <div className="p-5 bg-gray-900 min-h-screen">
          <AptitudeTest testTitle={tagName} />
        </div>
      ) : (
        <div className="p-5 space-y-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 h-auto">
          <h2 className="text-2xl font-bold text-white">Questions on "{tagName}"</h2>
          {questions.length === 0 ? (
            <p className="text-gray-300">No questions found.</p>
          ) : (
            questions.map((question) => (
              <Question topic={tagName} key={question._id} data={question} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default TagPage;
