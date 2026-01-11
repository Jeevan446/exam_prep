import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, LayoutGrid, Loader2, Send, CheckCircle2, 
  XCircle, RotateCcw, AlertCircle, BarChart3, TrendingUp, Eraser 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../../components/SideBar"

import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";

const SetPaperpage = () => {
  const { examtype, id } = useParams();
  const navigate = useNavigate();

  // --- State Management ---
  const [examData, setExamData] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  // --- Audio Logic ---
  const buzzerRef = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg"));

  // --- Data Fetching ---
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/setexam/set-questions/${id}?examType=${examtype}`);
        if (response.data) {
          setExamData(response.data);
          const allQuestions = response.data.subjects?.flatMap(sub => 
            sub.questions.map(q => ({ ...q, subjectName: sub.subject }))
          ) || [];
          setQuestionSet(allQuestions);
          setTimeRemaining((response.data.examTime || 180) * 60);
          setIsTimerRunning(true);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id, examtype]);

  // --- Handlers ---
  const handleFinalSubmit = useCallback(() => {
    setIsTimerRunning(false);
    setShowResults(true);
    setIsConfirming(false);
    buzzerRef.current.play().catch(() => console.log("Audio play blocked"));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOptionClick = (qId, idx, e) => {
    e.stopPropagation();
    if (showResults) return;

    setSelectedOptions(prev => {
      // UNSELECT FEATURE: If clicking the same option again, remove it
      if (prev[qId] === idx) {
        const newState = { ...prev };
        delete newState[qId];
        return newState;
      }
      return { ...prev, [qId]: idx };
    });
  };

  const clearOption = (qId) => {
    if (showResults) return;
    setSelectedOptions(prev => {
      const newState = { ...prev };
      delete newState[qId];
      return newState;
    });
  };

  // --- Timer Effect ---
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      handleFinalSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, handleFinalSubmit]);

  // --- Result Analysis Logic ---
  const analysis = useMemo(() => {
    if (!showResults || !examData) return null;

    const subjectStats = {};
    let totalObtained = 0;
    let totalPossible = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    examData.subjects.forEach(sub => {
      let subScore = 0;
      let subTotalMarks = 0;
      let subCorrect = 0;

      sub.questions.forEach(q => {
        subTotalMarks += q.marks;
        const userChoiceIdx = selectedOptions[q._id];
        if (userChoiceIdx !== undefined) {
          if (q.options[userChoiceIdx] === q.answer) {
            subScore += q.marks;
            subCorrect++;
            totalCorrect++;
          } else {
            totalWrong++;
          }
        }
      });

      subjectStats[sub.subject] = {
        score: subScore,
        total: subTotalMarks,
        correct: subCorrect,
        count: sub.questions.length
      };

      totalObtained += subScore;
      totalPossible += subTotalMarks;
    });

    return { 
      totalObtained, totalPossible, totalCorrect, totalWrong, 
      subjectStats, skipped: questionSet.length - (totalCorrect + totalWrong) 
    };
  }, [showResults, selectedOptions, examData, questionSet.length]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs + ":" : ""}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <Loading />;

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="sticky top-0 z-[60] w-full"><NavBar /></div>
      <SideBar />

      <div className="flex flex-1">
        {/* PALETTE SIDEBAR */}
        <aside className="hidden xl:block w-64 h-[calc(100vh-64px)] sticky top-16 bg-base-100 border-r border-base-content/20 p-5 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6 px-1">
            <LayoutGrid size={14} className="text-secondary" />
            <h3 className="text-[10px] font-black text-secondary uppercase tracking-tighter">Question Palette</h3>
          </div>
          {examData?.subjects?.map((sub, sIdx) => (
            <div key={sIdx} className="mb-8">
              <div className="flex justify-between items-center mb-3 px-1">
                <p className="text-[10px] font-black text-secondary uppercase tracking-tight">{sub.subject}</p>
                <span className="text-[9px] font-bold text-secondary border border-secondary px-2 py-0.5 rounded-full">
                  {sub.questions.filter(q => selectedOptions[q._id] !== undefined).length}/{sub.questions.length}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">  
                {sub.questions.map((q, qIdx) => (
                  <button key={q._id} onClick={() => document.getElementById(`question-${q._id}`).scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className={`h-8 w-8 rounded-lg text-[10px] font-bold border transition-all shadow-sm
                      ${selectedOptions[q._id] !== undefined ? 'bg-secondary border-secondary text-white' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-400'}`}>
                    {qIdx + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <main className="flex-1 pb-24">
          {/* STICKY HEADER */}
          <div className="sticky top-[64px] z-50 bg-base-100 border-b border-secondary px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Active Exam</span>
              <h2 className="text-xs font-bold text-ghost truncate max-w-[150px]">{examData?.setName}</h2>
            </div>  
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 font-mono font-bold px-4 py-2 rounded-2xl border text-sm shadow-sm
                ${timeRemaining < 300 && !showResults ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : ' text-ghost border-secondary'}`}>
                <Clock size={16} /> {showResults ? "FINISHED" : formatTime(timeRemaining)}
              </div>
              {!showResults && (
                <button onClick={() => setIsConfirming(true)} className="btn btn-info text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Send size={14} /> Submit
                </button>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-6 md:p-10">
            {/* RESULTS DASHBOARD */}
            <AnimatePresence>
              {showResults && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-12">
                  <div className=" border-2 border-secondary rounded-2xl p-8 ">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-black text-ghost flex items-center gap-3">
                        <TrendingUp className="text-secondary" /> Performance Report
                      </h2>
                      <button onClick={() => window.location.reload()} className="p-3 border-2 border-secondary rounded-2xl hover:bg-secondary hover:text-ghost  transition-all">
                        <RotateCcw size={20}/>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                      <StatCard label="Total Score" value={`${analysis.totalObtained}/${analysis.totalPossible}`} color="blue" />
                      <StatCard label="Correct" value={analysis.totalCorrect} color="green" />
                      <StatCard label="Wrong" value={analysis.totalWrong} color="red" />
                      <StatCard label="Skipped" value={analysis.skipped} color="slate" />
                    </div>

                    <h3 className="text-[10px] font-black text-secondary uppercase tracking-widest mb-6 px-1">Subject Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(analysis.subjectStats).map(([name, stats]) => (
                        <SubjectResultCard key={name} name={name} stats={stats} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QUESTIONS LIST */}
            {examData?.subjects?.map((sub) => (
              <div key={sub.subject} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xs font-black text-ghost uppercase tracking-[0.3em]">{sub.subject}</h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-secondary to-transparent" />
                </div>
                <div className="space-y-8">
                  {sub.questions.map((q, qIdx) => (
                    <QuestionCard 
                      key={q._id} q={q} qIdx={qIdx} subName={sub.subject}
                      showResults={showResults} 
                      isSelected={selectedOptions[q._id]}
                      onSelect={(idx, e) => handleOptionClick(q._id, idx, e)}
                      onClear={() => clearOption(q._id)} // PASS CLEAR HANDLER
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {isConfirming && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsConfirming(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-base-100 border-2 border-secondary rounded-[2rem] p-10 max-w-sm w-full text-center">
              <div className="w-20 h-20 text-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-secondary mb-2">Final Submit?</h3>
              <p className="text-ghost text-sm leading-relaxed mb-8">You've attempted {Object.keys(selectedOptions).length} questions. Are you sure you want to end the test?</p>
              <div className="flex gap-4">
                <button onClick={() => setIsConfirming(false)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                <button onClick={handleFinalSubmit} className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold  hover:bg-secondary transition-all">Yes, Submit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- REUSABLE COMPONENTS --- */

const SubjectResultCard = ({ name, stats }) => {
  const percentage = Math.round((stats.score / stats.total) * 100) || 0;
  const colorClass = percentage >= 75 ? 'bg-success' : percentage >= 40 ? 'bg-info' : 'bg-error';
  
  return (
    <div className="border border-secondary rounded-2xl p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black text-ghost uppercase mb-1">{name}</p>
          <p className="text-xl font-black text-white">{stats.score}<span className="text-sm text-ghost opacity-50">/{stats.total}</span></p>
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg text-white ${colorClass}`}>{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1 }} className={`h-full ${colorClass}`} />
      </div>
      <div className="flex justify-between text-[9px] font-bold text-ghost uppercase tracking-tighter">
        <span>Accuracy: {Math.round((stats.correct / stats.count) * 100)}%</span>
        <span>{stats.correct}/{stats.count} Correct</span>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const themes = { 
    blue: "bg-blue-50 text-blue-700 border-blue-100", 
    green: "bg-green-50 text-green-700 border-green-100",
    red: "bg-red-50 text-red-700 border-red-100", 
    slate: "bg-slate-50 text-slate-700 border-slate-100" 
  };
  return (
    <div className={`p-5 rounded-2xl border text-center ${themes[color]}`}>
      <p className="text-[9px] uppercase font-black opacity-60 mb-1 tracking-widest">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
};

const QuestionCard = ({ q, qIdx, subName, showResults, isSelected, onSelect, onClear }) => {
  return (
    <div id={`question-${q._id}`} className=" border border-secondary rounded-3xl p-8 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className=" text-[10px] font-black px-3 py-1 rounded-full text-ghost uppercase tracking-widest border border-secondary">{subName} — Q {qIdx + 1}</span>
          {/* CLEAR SELECTION BUTTON (Only visible during exam and when an option is selected) */}
          {!showResults && isSelected !== undefined && (
            <button 
              onClick={onClear}
              className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              <Eraser size={12} /> unselect option
            </button>
          )}
        </div>
        <span className="text-[10px] font-black text-info px-3 py-1 rounded-full border border-info">+{q.marks} Marks</span>
      </div>
      <p className="text-lg font-bold text-ghost mb-8 leading-relaxed select-none">{q.name}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {q.options.map((opt, i) => {
          const active = isSelected === i;
          const isCorrect = opt === q.answer;
          let btnStyle = "border-secondary/40 text-ghost hover:border-info";
          if (!showResults) {
            if (active) btnStyle = "border-info bg-info text-neutral";
          } else {
            if (isCorrect) btnStyle = "border-success bg-success text-ghost scale-[1.02] z-10";
            else if (active) btnStyle = "border-red-500 bg-red-500 text-white";
            else btnStyle = "border-secondary/40";
          }
          return (
            <button key={i} disabled={showResults} onClick={(e) => onSelect(i, e)}
              className={`p-5 rounded-2xl border-2 text-left text-sm font-bold flex items-center justify-between gap-4 transition-all duration-300 ${btnStyle}`}>
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center border font-black text-xs ${active || (showResults && isCorrect) ? 'bg-white/20 border-white/10' : 'border-neutral'}`}>{String.fromCharCode(65 + i)}</span>
                <span className="leading-snug">{opt}</span>
              </div>
              {showResults && isCorrect && <CheckCircle2 size={18} />}
              {showResults && active && !isCorrect && <XCircle size={18} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};



export default SetPaperpage;