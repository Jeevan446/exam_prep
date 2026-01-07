import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const AddSubjectWithChapters = () => {
 
  const [examTypes, setExamTypes] = useState([]);
  const [loadingExamType, setLoadingExamType] = useState(true);

  const [examType, setExamType] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [subject, setSubject] = useState("");
  const [chapters, setChapters] = useState([]);
  const [chapterInput, setChapterInput] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [submitting, setSubmitting] = useState(false);

  /* -------------------- FETCH EXAM TYPES -------------------- */
  useEffect(() => {
    fetchExamTypeData();
  }, []);

  const fetchExamTypeData = async () => {
    try {
      setLoadingExamType(true);
      const response = await axios.get("/api/demomode/getexams");
      const names = response.data.examTypes.map((item) => item.name);
      setExamTypes(names);
    } catch (err) {
      console.error("Error fetching exam types:", err);
      toast.error("Failed to load exam types");
    } finally {
      setLoadingExamType(false);
    }
  };

  /* -------------------- FETCH SUBJECTS ACCORDING TO EXAM TYPE -------------------- */
  useEffect(() => {
    if (!examType) {
      setSubjects([]);
      setSubject("");
      return;
    }
    fetchSubjects(examType);
  }, [examType]);

  const fetchSubjects = async (selectedExamType) => {
    try {
      setLoadingSubjects(true);
      const response = await axios.get(
        `/api/demomode/${selectedExamType}/subjects`
      );
      setSubjects(response.data.subjects || []);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      toast.error("Failed to load subjects for this exam type");
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  /* -------------------- CHAPTER HANDLERS -------------------- */
  const handleAddChapter = () => {
    if (!chapterInput.trim()) return;
    setChapters([...chapters, chapterInput.trim()]);
    setChapterInput("");
  };

  const handleDeleteChapter = (index) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleEditChapter = (index) => {
    setEditingIndex(index);
    setEditText(chapters[index]);
  };

  const handleSaveChapter = (index) => {
    if (!editText.trim()) return;
    const updated = [...chapters];
    updated[index] = editText.trim();
    setChapters(updated);
    setEditingIndex(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!examType || !subject.trim() || chapters.length === 0) {
      toast.error("Please select exam type, subject and add chapters");
      return;
    }

    const payload = {
      examtype: examType,
      subject: subject.trim(),
      chapters: chapters,
    };

    console.log("Submitting:", payload);

    try {
      setSubmitting(true);
      const response = await axios.post("/api/demomode/addchapter", payload);
      toast.success(
        response.data.message || "Subject and chapters added successfully"
      );

      // reset
      setExamType("");
      setSubject("");
      setChapters([]);
      setChapterInput("");
      setSubjects([]);
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error(err.response?.data?.message || "Failed to save subject");
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="flex justify-center items-start min-h-screen px-3 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-base-300 p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-lg border border-secondary"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
          Add Subject & Chapters
        </h2>

        {/* -------- EXAM TYPE -------- */}
        <label className="block mb-2 font-medium text-secondary">Select Exam Type</label>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full p-3 mb-4 border border-secondary rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="text-info">-- Select Exam Type --</option>
          {loadingExamType ? (
            <option disabled className="text-secondary">Loading...</option>
          ) : (
            examTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))
          )}
        </select>

        {/* -------- SUBJECT SELECTION -------- */}
        <label className="block mb-2 font-medium text-secondary">Select Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 mb-4 border border-secondary rounded-lg focus:ring-2 focus:ring-blue-500"
          disabled={!examType || loadingSubjects}
        >
          <option value="" className="text-info">-- Select or enter new subject --</option>
          {loadingSubjects ? (
            <option disabled>Loading subjects...</option>
          ) : (
            subjects.map((subj, idx) => (
              <option key={idx} value={subj.name}>
                {subj.name}
              </option>
            ))
          )}
        </select>

        {/* -------- ADD CHAPTER -------- */}
        <label className="block mb-2 font-medium text-secondary">Add Chapters</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={chapterInput}
            onChange={(e) => setChapterInput(e.target.value)}
            placeholder="Enter chapter name"
            className="flex-1 p-3 border rounded-lg border-secondary outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!subject || submitting}
          />
          <button
            type="button"
            onClick={handleAddChapter}
            disabled={!chapterInput.trim() || submitting}
            className="btn btn-secondary"
          >
            Add
          </button>
        </div>

        {/* -------- CHAPTER LIST -------- */}
        {chapters.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-secondary mb-2">Chapters Added</h3>
            <ul className="border border-secondary rounded-lg p-3 space-y-2 max-h-64 overflow-y-auto">
              {chapters.map((c, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-base-100 p-2 rounded"
                >
                  {editingIndex === index ? (
                    <div className="flex gap-2 w-full">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="text-ghost flex-1 border border-secondary p-2 rounded"
                      />  
                      <button
                        type="button"
                        onClick={() => handleSaveChapter(index)}
                        className="text-green-600"  
                      >
                        <FaCheck />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-gray-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1">{c}</span>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          type="button"
                          onClick={() => handleEditChapter(index)}
                          className="text-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteChapter(index)}
                          className="text-red-600"
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* -------- SUBMIT -------- */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full btn btn-secondary ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Saving..." : "Save Subject & Chapters"}
        </button>
      </form>
    </div>
  );
};

export default AddSubjectWithChapters;
