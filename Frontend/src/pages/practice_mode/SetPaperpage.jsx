import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import {
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Award,
  ArrowLeft,
  RotateCcw,
  Send,
  Loader2,
  BookOpen,
  AlertCircle,
  Check,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const SetPaperpage = () => {
  const { examtype, id } = useParams(); // Get from URL params
  const navigate = useNavigate();
  
  /* ===================== STATE ===================== */
  const [examData, setExamData] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);

  /* ===================== FETCH DATA ===================== */
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching from:", `/api/setexam/set-questions/${id}?examType=${examtype}`);
        const response = await axios.get(
          `/api/setexam/set-questions/${id}?examType=${examtype}`
        );
        
        console.log("API Response:", response.data);
        
        if (response.data && response.data.success === true) {
          setExamData(response.data);
          
          // Flatten questions for easy access
          const allQuestions = response.data.subjects?.flatMap(sub => sub.questions || []) || [];
          setQuestionSet(allQuestions);
          
          // Set timer - default to 180 minutes if not provided
          setTimeRemaining((response.data.examTime || 180) * 60);
          
          console.log("Data loaded successfully:", {
            setName: response.data.setName,
            subjects: response.data.subjects?.length,
            questions: allQuestions.length
          });
        } else {
          throw new Error("Invalid response format or success: false");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to load exam data");
        
        // Fallback to hardcoded data if API fails
        console.log("Using fallback hardcoded data");
        const fallbackData = {
          success: true,
          setId: id,
          setName: "Set A",
          examType: examtype,
          examTime: 180,
          fullMarks: 100,
          subjects: [
            {
              subject: "Physics",
              questions: [
                {
                  _id: "6961383ad1208e9ff8da9c90",
                  name: "What is Ohm's Law?",
                  examtype: "ioe",
                  subject: "Physics",
                  chapter: "Electricity",
                  level: "Easy",
                  options: ["V=IR", "P=VI", "F=ma", "E=mc²"],
                  answer: "V=IR",
                  marks: 2
                }
              ]
            },
            {
              subject: "Math",
              questions: [
                {
                  _id: "69613894241838df74bfbf06",
                  name: "2 + 2 = ?",
                  examtype: "ioe",
                  subject: "Math",
                  chapter: "Algebra",
                  level: "Easy",
                  options: ["1", "2", "3", "4"],
                  answer: "4",
                  marks: 1
                }
              ]
            }
          ]
        };
        
        setExamData(fallbackData);
        const allQuestions = fallbackData.subjects.flatMap(sub => sub.questions);
        setQuestionSet(allQuestions);
        setTimeRemaining(fallbackData.examTime * 60);
      } finally {
        setLoading(false);
      }
    };

    if (id && examtype) {
      fetchExam();
    }
  }, [id, examtype]);

  /* ===================== TIMER LOGIC ===================== */
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0 || showResults) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, showResults]);

  /* ===================== AUTO SUBMIT ON TIME UP ===================== */
  const handleAutoSubmit = () => {
    setIsTimerRunning(false);
    setShowResults(true);
    alert("Time's up! Your answers have been submitted automatically.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ===================== TRACK ANSWERED QUESTIONS ===================== */
  useEffect(() => {
    const count = Object.keys(selectedOptions).length;
    setAnsweredCount(count);
  }, [selectedOptions]);

  /* ===================== SCORE CALCULATION ===================== */
  const stats = useMemo(() => {
    if (!examData) return { 
      score: 0, 
      correct: 0, 
      incorrect: 0, 
      percent: 0, 
      unattempted: 0,
      fullMarks: 100 
    };
    
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    const totalQuestions = questionSet.length;

    questionSet.forEach(q => {
      const userIdx = selectedOptions[q._id];
      if (userIdx !== undefined) {
        if (q.options && q.options[userIdx] === q.answer) {
          score += q.marks || 1;
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const unattempted = totalQuestions - correct - incorrect;
    const fullMarks = examData.fullMarks || 100;

    return {
      score,
      correct,
      incorrect,
      unattempted,
      fullMarks,
      percent: fullMarks > 0 ? Math.round((score / fullMarks) * 100) : 0
    };
  }, [selectedOptions, showResults, questionSet, examData]);

  /* ===================== HANDLERS ===================== */
  const handleOptionClick = (qid, idx) => {
    if (showResults) return;
    setSelectedOptions(prev => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = () => {
    if (window.confirm(`Are you sure you want to submit?\n\nAnswered: ${answeredCount}/${questionSet.length}\nUnanswered: ${questionSet.length - answeredCount}`)) {
      setIsTimerRunning(false);
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  /* ===================== RENDER LOADING ===================== */
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-20 animate-pulse"></div>
        </div>
        <p className="text-gray-700 font-bold text-lg animate-pulse uppercase tracking-widest mt-4">
          Loading Exam Set...
        </p>
        <p className="text-gray-400 text-sm mt-2">{examtype?.toUpperCase?.() || "EXAM"} - {id?.slice?.(-6) || "SET"}</p>
      </div>
    );
  }

  /* ===================== RENDER NO DATA ===================== */
  if (!examData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <AlertCircle className="w-20 h-20 text-red-400 mb-4" />
        <h2 className="text-2xl font-black text-gray-800 mb-2">No Exam Data Found</h2>
        <p className="text-gray-500 mb-4">Could not load exam data from the server.</p>
        {error && <p className="text-red-500 text-sm mb-6">Error: {error}</p>}
        <button
          onClick={() => navigate(`/practice/examtype/${examtype || "ioe"}`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          <ArrowLeft size={18} /> Back to Practice
        </button>
      </div>
    );
  }

  // Safe data access with fallbacks
  const safeExamData = {
    setName: examData?.setName || "Set Paper",
    examType: examData?.examType || examtype || "ioe",
    fullMarks: examData?.fullMarks || 100,
    subjects: examData?.subjects || []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <NavBar />
      <div className="flex">
        <SideBar />
        
        <main className="flex-1 p-4 lg:p-8 max-w-6xl mx-auto">
          
          {/* Top Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <button 
              onClick={() => navigate(`/practice/examtype/${examtype || "ioe"}`)}
              className="group flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold transition-all px-4 py-2 rounded-xl hover:bg-blue-50"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> 
              <span className="hidden sm:inline">Back to Sets</span>
              <span className="sm:hidden">Back</span>
            </button>
            
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                {safeExamData.setName}
              </h1>
              <div className="flex gap-2 justify-end items-center mt-1 flex-wrap">
                <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full font-black uppercase">
                  {safeExamData.examType}
                </span>
                <span className="text-xs text-gray-500 font-bold uppercase">
                  Full Marks: {safeExamData.fullMarks}
                </span>
                <span className="text-xs text-gray-500 font-bold uppercase">
                  • {safeExamData.subjects.length} Subjects
                </span>
                <span className="text-xs text-gray500 font-bold uppercase">
                  • {questionSet.length} Questions
                </span>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-yellow-600" size={20} />
                <p className="text-yellow-800 text-sm">
                  Using fallback data. API Error: {error}
                </p>
              </div>
            </div>
          )}

          {/* Progress Stats Bar */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-gray-400 tracking-widest">Answered</div>
                  <div className="text-2xl font-black text-gray-900">
                    {answeredCount}<span className="text-gray-400 text-lg">/{questionSet.length}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="text-green-600" size={20} />
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${questionSet.length > 0 ? (answeredCount / questionSet.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-gray-400 tracking-widest">Remaining</div>
                  <div className="text-2xl font-black text-gray-900">
                    {Math.max(0, questionSet.length - answeredCount)}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-gray-400 tracking-widest">Time Left</div>
                  <div className={`font-mono text-2xl font-black ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatTime(timeRemaining)}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${timeRemaining < 300 ? 'bg-red-100' : 'bg-blue-100'}`}>
                  <Clock className={timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'} size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-gray-400 tracking-widest">Score</div>
                  <div className="text-2xl font-black text-gray-900">
                    {stats.score}<span className="text-gray-400 text-lg">/{stats.fullMarks}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary - Show only when results are visible */}
          <AnimatePresence>
            {showResults && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-3xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-yellow-500" size={28} />
                  <h2 className="text-2xl font-black text-gray-900">Exam Results</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ResultCard 
                    icon={<Award className="text-yellow-500"/>} 
                    label="Total Score" 
                    value={`${stats.score}/${stats.fullMarks}`}
                    subtext={`${stats.percent}%`}
                  />
                  <ResultCard 
                    icon={<CheckCircle className="text-green-500"/>} 
                    label="Correct" 
                    value={stats.correct}
                    subtext={questionSet.length > 0 ? `${Math.round((stats.correct / questionSet.length) * 100)}%` : "0%"}
                  />
                  <ResultCard 
                    icon={<XCircle className="text-red-500"/>} 
                    label="Incorrect" 
                    value={stats.incorrect}
                    subtext={questionSet.length > 0 ? `${Math.round((stats.incorrect / questionSet.length) * 100)}%` : "0%"}
                  />
                  <ResultCard 
                    icon={<BookOpen className="text-blue-500"/>} 
                    label="Unattempted" 
                    value={stats.unattempted}
                    subtext={questionSet.length > 0 ? `${Math.round((stats.unattempted / questionSet.length) * 100)}%` : "0%"}
                  />
                </div>
                
                {/* Performance Summary */}
                <div className="mt-8 pt-8 border-t border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-gray-800 mb-2">Performance Summary</h3>
                      <p className="text-gray-600">
                        {stats.percent >= 80 ? "🎉 Excellent work! You're mastering this subject!" :
                         stats.percent >= 60 ? "👍 Good job! Keep practicing to improve further!" :
                         stats.percent >= 40 ? "📚 Keep going! Review the topics you missed." :
                         "📖 More practice needed. Review the concepts and try again."}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black text-gray-900">{stats.percent}%</div>
                      <div className="text-sm text-gray-500">Accuracy</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subjects and Questions */}
          <div className="pr-0">
            {safeExamData.subjects.map((sub, subjectIndex) => (
              <div key={sub.subject || subjectIndex} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        {sub.subject || `Subject ${subjectIndex + 1}`}
                      </h2>
                      <p className="text-sm text-gray-500 font-medium">
                        {(sub.questions?.length || 0)} Questions • 
                        {(sub.questions?.reduce((sum, q) => sum + (q.marks || 1), 0) || 0)} Marks
                      </p>
                    </div>
                  </div>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-100 to-purple-100" />
                </div>

                <div className="space-y-8">
                  {sub.questions?.map((q, qIdx) => {
                    if (!q) return null;
                    
                    return (
                      <div 
                        key={q._id || qIdx} 
                        className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-tighter">
                              Question {qIdx + 1}
                            </span>
                            {showResults && selectedOptions[q._id] !== undefined && (
                              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                q.options?.[selectedOptions[q._id]] === q.answer 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {q.options?.[selectedOptions[q._id]] === q.answer ? 'Correct' : 'Incorrect'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                              {q.chapter || "Chapter"}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              (q.level === 'Easy') ? 'bg-green-100 text-green-700' :
                              (q.level === 'Medium') ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {q.level || "Medium"}
                            </span>
                            <span className="text-sm font-black text-blue-600">{q.marks || 1} Marks</span>
                          </div>
                        </div>

                        <p className="text-gray-800 text-lg md:text-xl font-semibold mb-8 leading-relaxed">
                          {q.name || "Question text not available"}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options?.map((opt, i) => {
                            const isSelected = selectedOptions[q._id] === i;
                            const isCorrect = opt === q.answer;
                            
                            let optStyle = "border-2 border-gray-100 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
                            if (showResults) {
                              if (isCorrect) {
                                optStyle = "border-2 border-green-500 bg-green-50 text-green-800 shadow-lg shadow-green-100/50";
                              } else if (isSelected && !isCorrect) {
                                optStyle = "border-2 border-red-500 bg-red-50 text-red-800 shadow-lg shadow-red-100/50";
                              }
                            } else if (isSelected) {
                              optStyle = "border-2 border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200";
                            }

                            return (
                              <button
                                key={i}
                                disabled={showResults}
                                onClick={() => handleOptionClick(q._id, i)}
                                className={`p-5 rounded-2xl text-left text-base font-medium transition-all duration-300 flex items-center gap-4 group ${optStyle}`}
                              >
                                <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 font-bold transition-all
                                  ${showResults && isCorrect ? 'bg-green-100 border-green-300 text-green-700' :
                                    showResults && isSelected && !isCorrect ? 'bg-red-100 border-red-300 text-red-700' :
                                    isSelected && !showResults ? 'bg-white border-white text-blue-600' :
                                    'bg-white border-gray-200 text-gray-400 group-hover:border-blue-300'}`}>
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span className="flex-1">{opt || `Option ${String.fromCharCode(65 + i)}`}</span>
                                
                                {/* Show icons for results */}
                                {showResults && isCorrect && (
                                  <CheckCircle className="text-green-500 ml-2 flex-shrink-0" size={20} />
                                )}
                                {showResults && isSelected && !isCorrect && (
                                  <XCircle className="text-red-500 ml-2 flex-shrink-0" size={20} />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation for correct answer (show only in results) */}
                        {showResults && q.answer && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen size={18} className="text-blue-600" />
                              <h4 className="font-bold text-blue-800">Correct Answer</h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700">
                                {q.options?.includes(q.answer) ? 
                                  String.fromCharCode(65 + q.options.indexOf(q.answer)) : 
                                  "A"}
                              </div>
                              <p className="text-blue-900 font-medium">{q.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Submission Bar */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="flex flex-col items-center">
              {!showResults ? (
                <>
                  <div className="mb-8 text-center">
                    <div className="text-gray-600 font-medium mb-2">
                      Answered: <span className="font-black text-gray-900">{answeredCount}</span> / {questionSet.length} questions
                    </div>
                    <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${questionSet.length > 0 ? (answeredCount / questionSet.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleSubmit}
                      disabled={answeredCount === 0}
                      className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={22} /> SUBMIT ANSWERS
                    </button>
                    
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                    >
                      <ArrowLeft className="rotate-90" size={18} /> Back to Top
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Exam Completed!</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      You scored {stats.score} out of {stats.fullMarks} marks. {
                        stats.percent >= 80 ? "Excellent performance! 🎉" :
                        stats.percent >= 60 ? "Good job! Keep it up! 👍" :
                        "Review your mistakes and try again! 📚"
                      }
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate(`/practice/examtype/${examtype || "ioe"}`)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <RotateCcw size={20} /> Try Another Set
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setIsTimerRunning(true);
                        setSelectedOptions({});
                      }}
                      className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                    >
                      <RotateCcw size={20} /> Retry This Set
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* Result Card Sub-component */
const ResultCard = ({ icon, label, value, subtext }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-xs font-black uppercase text-gray-400 tracking-widest">{label}</div>
        <div className="text-2xl font-black text-gray-900 leading-none">{value}</div>
        {subtext && <div className="text-sm text-gray-500 mt-1">{subtext}</div>}
      </div>
    </div>
  </div>
);

export default SetPaperpage;