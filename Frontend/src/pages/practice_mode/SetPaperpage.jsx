import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import {
  ChevronUp,
  ChevronDown,
  Clock,
  Pause,
  Play,
  RefreshCw,
  Grip,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  BarChart3,
  Award,
  BookOpen,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ===================== QUESTION DATA ===================== */
const questionSet = [
  {
    id: "math-1",
    sub: "math",
    qn: "What is the derivative of x²?",
    options: ["2x", "x", "x²", "1"],
    correctAns: 0,
    marks: 2,
  },
  {
    id: "math-2",
    sub: "math",
    qn: "Value of √144 is?",
    options: ["10", "11", "12", "14"],
    correctAns: 2,
    marks: 2,
  },
  {
    id: "physics-1",
    sub: "physics",
    qn: "Unit of force is?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAns: 1,
    marks: 2,
  },
  {
    id: "chemistry-1",
    sub: "chemistry",
    qn: "Chemical formula of water is?",
    options: ["CO₂", "H₂SO₄", "H₂O", "NaCl"],
    correctAns: 2,
    marks: 2,
  },
  {
    id: "computer-1",
    sub: "computer",
    qn: "Which data structure follows FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAns: 1,
    marks: 2,
  },
  {
    id: "english-1",
    sub: "english",
    qn: "Choose the synonym of 'Happy'",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctAns: 2,
    marks: 2,
  },
];

/* ===================== GROUP BY SUBJECT ===================== */
const groupedQuestions = {
  math: questionSet.filter((q) => q.sub === "math"),
  physics: questionSet.filter((q) => q.sub === "physics"),
  chemistry: questionSet.filter((q) => q.sub === "chemistry"),
  computer: questionSet.filter((q) => q.sub === "computer"),
  english: questionSet.filter((q) => q.sub === "english"),
};

const SetPaperpage = () => {
  /* ===================== STATE ===================== */
  const [timeRemaining, setTimeRemaining] = useState(3 * 60 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isTimerMinimized, setIsTimerMinimized] = useState(false);
  const [timerPosition, setTimerPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  /* ===================== TIMER LOGIC ===================== */
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0 && !showResults) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  /* ===================== SCORE CALCULATION ===================== */
  const calculateResults = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const questionResults = [];

    questionSet.forEach((q) => {
      const userAnswer = selectedOptions[q.id];
      const isAnswered = userAnswer !== undefined;
      const isCorrect = userAnswer === q.correctAns;

      if (!isAnswered) {
        unanswered++;
      } else if (isCorrect) {
        score += q.marks;
        correct++;
      } else {
        incorrect++;
      }

      questionResults.push({
        ...q,
        userAnswer,
        isCorrect,
        isAnswered,
      });
    });

    const totalMarks = questionSet.reduce((sum, q) => sum + q.marks, 0);
    const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;

    return {
      score,
      totalMarks,
      correct,
      incorrect,
      unanswered,
      percentage: Math.round(percentage),
      questionResults,
    };
  };

  const results = calculateResults();

  /* ===================== SUBMIT HANDLER ===================== */
  const handleSubmit = () => {
    setIsTimerRunning(false);
    setShowResults(true);
    setShowAnswerReview(true); // Automatically show answers when submitted
  };

  const handleOptionSelect = (qid, optIndex) => {
    if (!showResults) {
      setSelectedOptions((prev) => ({
        ...prev,
        [qid]: optIndex,
      }));
    }
  };

  /* ===================== RENDER QUESTION OPTIONS WITH COLORS ===================== */
  const renderQuestionOptions = (q) => {
    return q.options.map((opt, i) => {
      const isSelected = selectedOptions[q.id] === i;
      const isCorrectAnswer = i === q.correctAns;
      const showAnswer = showAnswerReview;
      
      // Determine the color based on submission state
      let optionStyle = "";
      
      if (showAnswer) {
        if (isCorrectAnswer) {
          // Correct answer is always green
          optionStyle = "bg-green-100 border-green-500 text-green-800";
        } else if (isSelected && !isCorrectAnswer) {
          // Selected but wrong answer is red
          optionStyle = "bg-red-100 border-red-500 text-red-800";
        } else {
          // Unselected options
          optionStyle = "bg-gray-100 border-gray-300 text-gray-600";
        }
      } else {
        // Before submission
        optionStyle = isSelected
          ? "bg-blue-100 border-blue-500 text-blue-800"
          : "bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700 hover:border-blue-300";
      }

      return (
        <motion.label
          key={i}
          className={`flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer border transition-all duration-200 ${optionStyle} ${
            !showResults ? "cursor-pointer" : "cursor-default"
          }`}
          whileHover={!showResults ? { scale: 1.02 } : {}}
          whileTap={!showResults ? { scale: 0.98 } : {}}
        >
          <div className="flex items-center gap-3 flex-1">
            <input
              type="radio"
              name={q.id}
              checked={isSelected}
              onChange={() => handleOptionSelect(q.id, i)}
              className="h-4 w-4"
              disabled={showResults}
            />
            <span className="font-medium">{opt}</span>
          </div>
          
          {/* Show icons for correct/incorrect answers after submission */}
          {showAnswer && (
            <div className="ml-2">
              {isCorrectAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Correct</span>
                </motion.div>
              )}
              {isSelected && !isCorrectAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-red-700 font-medium">Incorrect</span>
                </motion.div>
              )}
            </div>
          )}
        </motion.label>
      );
    });
  };

  /* ===================== RENDER QUESTION SECTIONS ===================== */
  const renderQuestionSection = (title, list) => {
    if (list.length === 0) return null;

    return (
      <div className="space-y-4 mb-8">
        <motion.h2
          className="text-xl font-bold text-center bg-gradient-to-r from-blue-50 to-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title.toUpperCase()}
        </motion.h2>

        {list.map((q, index) => {
          const result = results.questionResults.find(r => r.id === q.id);
          
          return (
            <motion.div
              key={q.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow duration-300 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Status badge */}
              {showResults && (
                <div className="absolute -top-2 -right-2">
                  {result.isAnswered ? (
                    result.isCorrect ? (
                      <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-300">
                        <Check className="h-4 w-4" />
                        <span className="font-semibold">+{q.marks}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full border border-red-300">
                        <X className="h-4 w-4" />
                        <span className="font-semibold">0/{q.marks}</span>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full border border-yellow-300">
                      <span className="font-semibold">Not answered</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <p className="font-semibold text-gray-800 text-lg">
                  {index + 1}. {q.qn}
                </p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {q.marks} marks
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderQuestionOptions(q)}
              </div>

              {/* Feedback after submission */}
              {showResults && result.isAnswered && (
                <motion.div
                  className="mt-3 p-3 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{
                    backgroundColor: result.isCorrect ? '#dcfce7' : '#fee2e2',
                    borderLeft: `4px solid ${result.isCorrect ? '#22c55e' : '#ef4444'}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    {result.isCorrect ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-700">
                          Correct answer! You earned {q.marks} marks.
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-700">
                          Incorrect. The correct answer is: <strong>{q.options[q.correctAns]}</strong>
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Show correct answer if unanswered */}
              {showResults && !result.isAnswered && (
                <motion.div
                  className="mt-3 p-3 rounded-lg bg-blue-50 border-l-4 border-blue-500"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-700">
                      You didn't answer this question. Correct answer: <strong>{q.options[q.correctAns]}</strong>
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  /* ===================== RESULTS MODAL ===================== */
  const ResultsModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Exam Results</h2>
                <p className="text-blue-100">Paper submitted successfully!</p>
              </div>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="p-2 hover:bg-blue-700 rounded-full"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Score Summary */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50">
          {[
            {
              label: "Total Score",
              value: `${results.score}/${results.totalMarks}`,
              icon: Award,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Percentage",
              value: `${results.percentage}%`,
              icon: BarChart3,
              color: results.percentage >= 60 ? "text-green-600" : 
                     results.percentage >= 40 ? "text-yellow-600" : "text-red-600",
              bg: results.percentage >= 60 ? "bg-green-50" : 
                  results.percentage >= 40 ? "bg-yellow-50" : "bg-red-50",
            },
            {
              label: "Correct Answers",
              value: results.correct,
              icon: CheckCircle,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Incorrect Answers",
              value: results.incorrect,
              icon: XCircle,
              color: "text-red-600",
              bg: "bg-red-50",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`${item.bg} p-4 rounded-xl border`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
              </div>
              <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Performance Analysis */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Analysis
          </h3>
          <div className="space-y-3">
            {[
              { label: "Correct Answers", value: results.correct, total: questionSet.length, color: "bg-green-500" },
              { label: "Incorrect Answers", value: results.incorrect, total: questionSet.length, color: "bg-red-500" },
              { label: "Unanswered", value: results.unanswered, total: questionSet.length, color: "bg-yellow-500" },
            ].map((item, index) => {
              const percentage = (item.value / item.total) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.label}</span>
                    <span>{item.value} ({Math.round(percentage)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-gray-600">
            <p className="font-medium">Time Taken: {formatTime(3 * 60 * 60 - timeRemaining)}</p>
            <p className="text-sm">Total Questions: {questionSet.length}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowResults(false);
                setIsTimerRunning(true);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Review Questions
            </button>
            <button
              onClick={() => {
                alert("Your responses have been saved!");
                setShowResults(false);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  /* ===================== TIMER COMPONENT ===================== */
  const TimerComponent = () => {
    const isLowTime = timeRemaining < 300;
    const isCriticalTime = timeRemaining < 60;

    return (
      <motion.div
        className="fixed z-40"
        style={{
          x: timerPosition.x,
          y: timerPosition.y,
          top: "120px",
          right: "20px",
        }}
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          setTimerPosition({
            x: timerPosition.x + info.offset.x,
            y: timerPosition.y + info.offset.y,
          });
        }}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
      >
        <div className={`bg-white p-4 rounded-xl shadow-lg w-64 border-2 ${
          isCriticalTime ? "border-red-500" : isLowTime ? "border-orange-400" : "border-blue-200"
        }`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Clock className={`h-5 w-5 ${
                isCriticalTime ? "text-red-600" : "text-blue-600"
              }`} />
              <span className="font-bold">Exam Timer</span>
            </div>
            <button
              onClick={() => setIsTimerMinimized(!isTimerMinimized)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isTimerMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {!isTimerMinimized && (
            <>
              <div className={`text-center text-2xl font-mono font-bold my-2 ${
                isCriticalTime ? "text-red-600 animate-pulse" : "text-blue-700"
              }`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-3 py-1 rounded ${
                    isTimerRunning
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isTimerRunning ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={() => {
                    setTimeRemaining(3 * 60 * 60);
                    setIsTimerRunning(true);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6 space-y-8 max-w-6xl mx-auto">
          <TimerComponent />

          {/* Header */}
          <motion.div 
            className="text-center bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tribhuvan University</h1>
            <p className="text-lg text-gray-700 mb-1">Institute of Science and Technology</p>
            <p className="text-gray-600">2081</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-700">Time: 3 Hours</span>
            </div>
          </motion.div>

          {/* Questions Sections */}
          <div className="space-y-10">
            {Object.entries(groupedQuestions).map(([subject, questions]) => 
              questions.length > 0 && renderQuestionSection(subject, questions)
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center py-8">
            <motion.button
              className="px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={showResults}
            >
              {showResults ? "Submitted" : "Submit Answer Sheet"}
            </motion.button>
            
            {showResults && (
              <motion.div
                className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <p className="font-medium">Answers submitted! Review your results above.</p>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && <ResultsModal />}
      </AnimatePresence>
    </div>
  );
};

export default SetPaperpage;