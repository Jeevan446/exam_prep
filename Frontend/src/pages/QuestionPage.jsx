import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import axios from 'axios';

export default function MCQQuiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // Fetch questions from API
  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/demomode/BIT/Mathematics/Algebra/questions"
      );
      setQuizQuestions(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedOption) => {
    if (!userAnswers[questionId]) {
      setUserAnswers({
        ...userAnswers,
        [questionId]: selectedOption
      });
    }
  };

  // Reset quiz
  const handleReset = () => {
    setUserAnswers({});
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q._id] === q.answer) {
        correct += q.marks; // Add marks for correct answer
      }
    });
    return correct;
  };

  // Total marks
  const totalMarks = quizQuestions.reduce((acc, q) => acc + q.marks, 0);

  const allAnswered = Object.keys(userAnswers).length === quizQuestions.length;
  const score = calculateScore();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Multiple Choice Quiz
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Select an answer to see if it's correct
          </p>

          {allAnswered && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
              <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                Final Score
              </h2>
              <p className="text-lg text-indigo-700">
                You scored {score} out of {totalMarks}
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                {score === totalMarks
                  ? "Perfect score! 🎉"
                  : score >= totalMarks * 0.7
                  ? "Great job! 👏"
                  : "Keep practicing! 💪"}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {quizQuestions.map((q, qIndex) => {
              const userAnswer = userAnswers[q._id];
              const hasAnswered = userAnswer !== undefined;

              return (
                <div
                  key={q._id}
                  className="border-2 border-gray-200 rounded-lg p-5 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-indigo-600 mr-3">
                        Q{qIndex + 1}.
                      </span>
                      <p className="text-lg text-gray-800 font-medium flex-1">
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

                      let bgColor = 'bg-white hover:bg-gray-100';
                      let borderColor = 'border-gray-300';
                      let textColor = 'text-gray-700';

                      if (hasAnswered) {
                        if (isCorrectOption) {
                          bgColor = 'bg-green-100';
                          borderColor = 'border-green-300';
                          textColor = 'text-green-900';
                        } else if (isSelected && !isCorrectOption) {
                          bgColor = 'bg-red-100';
                          borderColor = 'border-red-500';
                          textColor = 'text-red-900';
                        }
                      } else if (isSelected) {
                        bgColor = 'bg-indigo-100';
                        borderColor = 'border-indigo-500';
                        textColor = 'text-indigo-900';
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerSelect(q._id, option)}
                          className={`w-full text-left p-3 border-2 rounded-lg transition-all ${bgColor} ${borderColor} ${textColor} cursor-pointer`}
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

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Retake Quiz
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Answered: {Object.keys(userAnswers).length} / {quizQuestions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
