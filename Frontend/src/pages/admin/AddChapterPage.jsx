import React, { useEffect, useState } from "react";
import axios from "axios";

import { MdOutlineDelete } from "react-icons/md";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const AddChapterPage = () => {
  /* -------------------- STATES -------------------- */
  const [examTypes, setExamTypes] = useState([]);
  const [loadingExamType, setLoadingExamType] = useState(true);

  const [examType, setExamType] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapters, setChapters] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  /* -------------------- FETCH EXAM TYPES -------------------- */
  useEffect(() => {
    fetchExamTypeData();
  }, []);

  const fetchExamTypeData = async () => {
    try {
      setLoadingExamType(true);

      const response = await axios.get("/api/demomode/getexams");

      // expecting: { examTypes: [{ name: "Midterm" }, { name: "Final" }] }
      const examTypeNames = response.data.examTypes.map(
        (item) => item.name
      );

      setExamTypes(examTypeNames);
    } catch (error) {
      console.error("Error fetching exam types:", error);
      alert("Failed to load exam types");
    } finally {
      setLoadingExamType(false);
    }
  };

  /* -------------------- CHAPTER HANDLERS -------------------- */
  const handleAddChapter = () => {
    if (!chapter.trim()) return;

    setChapters([...chapters, chapter.trim()]);
    setChapter("");
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

    if (!examType || chapters.length === 0) {
      alert("Please select exam type and add at least one chapter");
      return;
    }

    try {
      await axios.post("/api/chapter/add", {
        examType,
        chapters,
      });

      alert("Chapters saved successfully");

      // reset
      setExamType("");
      setChapters([]);
      setChapter("");
    } catch (error) {
      console.error("Error saving chapters:", error);
      alert("Failed to save chapters");
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-3 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Chapters
        </h2>

        {/* -------- EXAM TYPE -------- */}
        <label className="block mb-2 font-medium">
          Select Exam Type
        </label>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Exam Type --</option>

          {loadingExamType ? (
            <option disabled>Loading...</option>
          ) : (
            examTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))
          )}
        </select>

        {/* -------- ADD CHAPTER -------- */}
        <label className="block mb-2 font-medium">
          Chapter Name
        </label>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder="Enter chapter name"
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddChapter}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* -------- CHAPTER LIST -------- */}
        {chapters.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">
              Added Chapters
            </h3>

            <ul className="border rounded-lg p-3 space-y-2 max-h-64 overflow-y-auto">
              {chapters.map((c, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-2 rounded"
                >
                  {editingIndex === index ? (
                    <div className="flex gap-2 w-full">
                      <input
                        value={editText}
                        onChange={(e) =>
                          setEditText(e.target.value)
                        }
                        className="flex-1 border p-2 rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleSaveChapter(index)
                        }
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
                      <span className="flex-1">
                        {c}
                      </span>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleEditChapter(index)
                          }
                          className="text-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteChapter(index)
                          }
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
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Save Chapters
        </button>
      </form>
    </div>
  );
};

export default AddChapterPage;
