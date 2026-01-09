import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { motion, AnimatePresence, easeOut } from "framer-motion";

export default function MCQQuiz({ isOpen, setIsOpen }) {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  async function fetchData() {
    if (!location.state) {
      console.error("No navigation state found");
      setLoading(false);
      return;
    }

    try {
      const { examType, subject, chapter } = location.state;
      const response = await axios.get(
        `/api/demomode/${examType}/${subject}/${chapter}/questions`
      );
      setQuizQuestions(response.data.message || []);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  const handleAnswerSelect = (questionId, selectedOption) => {
    if (!userAnswers[questionId]) {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: selectedOption
      }));
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    handleScroll();
  };

  const handleScroll = () => {
    window.scrollTo({
      top: 0,       // scroll to the very top
      behavior: 'smooth' // smooth scrolling
    });
  }



  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q._id] === q.answer) {
        correct += q.marks;
      }
    });
    return correct;
  };



  const totalMarks = quizQuestions.reduce((acc, q) => acc + (q.marks || 0), 0);
  const answeredCount = Object.keys(userAnswers).length;
  const allAnswered = quizQuestions.length > 0 && answeredCount === quizQuestions.length;

  // if all answerd is ture then run 
  useEffect(() => {
    if (allAnswered) {
      const popup = document.getElementById("final-score-popup");
      if (popup) {
        popup.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [allAnswered]);


  const score = calculateScore();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading Quiz...</div>;
  }

  return (
    <div className="w-full flex flex-col ml-auto mr-auto">
      <NavBar />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-300 rounded-lg shadow-2xl p-8 border border-secondary/20">
          <h1 className="text-3xl font-bold text-secondary mb-2 text-center">
            Multiple Choice Question
          </h1>
          <p className="text-ghost text-center mb-6">
            Select an answer to see if it's correct
          </p>

          <div className="space-y-6">
            {quizQuestions.map((q, qIndex) => {
              const userAnswer = userAnswers[q._id];
              const hasAnswered = userAnswer !== undefined;

              return (
                <div
                  key={q._id}
                  className="border-2 border-secondary/40 rounded-lg p-5 bg-base-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-secondary mr-3">
                        Q{qIndex + 1}.
                      </span>
                      <p className="text-lg text-ghost font-medium flex-1">
                        {q.name}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      Marks: {q.marks}
                    </span>
                  </div>

                  <div className="space-y-2 ml-8">
                    {q.options.map((option, optIndex) => {
                      const isSelected = userAnswer === option;
                      const isCorrectOption = option === q.answer;

                      let bgColor = 'bg-base-100 hover:bg-base-100';
                      let borderColor = 'border-secondary/20  hover:border-secondary/50 transition-colors';
                      let textColor = 'text-ghost';

                      if (hasAnswered) {
                        if (isCorrectOption) {
                          bgColor = 'bg-success';
                          borderColor = 'border-green-300';
                          textColor = 'text-white';
                        } else if (isSelected && !isCorrectOption) {
                          bgColor = 'bg-error';
                          borderColor = 'border-red-500';
                          textColor = 'text-white';
                        }
                      } else if (isSelected) {
                        bgColor = 'bg-indigo-100';
                        borderColor = 'border-indigo-500';
                        textColor = 'text-indigo-900';
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={hasAnswered}
                          onClick={() => handleAnswerSelect(q._id, option)}
                          className={`w-full text-left p-3 border-2 rounded-lg transition-all ${bgColor} ${borderColor} ${textColor} ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* result pop up message when all answer attemped */}
          <AnimatePresence>

            {allAnswered && (
              <motion.div id="final-score-popup"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit ={{opacity:0,scale:0.5}}
                transition={{ duration: 0.5 ,ease:"easeOut"}}

                className="mb-6 mt-[3%] p-4 bg-base-100 rounded-lg border-2 border-secondary/50">
                <h2 className="text-xl font-semibold text-secondary mb-2">
                  Final Score
                </h2>
                <p className="text-lg text-ghost">
                  You scored <span className='text-secondary font-bold'>{score}</span> out of <span className='text-secondary font-bold'>{totalMarks}</span>
                </p>
                <p className="text-sm text-secondary mt-1">
                  {score === totalMarks
                    ? "Perfect score! "
                    : score >= totalMarks * 0.7
                      ? "Great job! "
                      : "Keep practicing!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleReset}
              className="btn btn-secondary px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Retake Quiz
            </button>
          </div>

          <p className="text-center text-sm text-ghost mt-4">
            Answered: {answeredCount} / {quizQuestions.length}
          </p>
        </div>
      </div>
    </div>
  );
}