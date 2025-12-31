import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const AddChapterPage = () => {
  const [examType, setExamType] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapters, setChapters] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

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
    const updatedChapters = [...chapters];
    updatedChapters[index] = editText.trim();
    setChapters(updatedChapters);
    setEditingIndex(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examType || chapters.length === 0) {
      alert("Please select exam type and add at least one chapter");
      return;
    }
    console.log({ examType, chapters });
    setExamType("");
    setChapters([]);
    setChapter("");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-3 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Chapters</h2>

        {/* Exam Type Select */}
        <label className="block mb-2 font-medium">Select Exam Type</label>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Exam Type --</option>
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
          <option value="Quiz">Quiz</option>
        </select>

        {/* Chapter Input */}
        <label className="block mb-2 font-medium">Chapter Name</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder="Enter chapter name"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddChapter}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition sm:w-auto"
          >
            Add
          </button>
        </div>

        {/* List of Added Chapters */}
        {chapters.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Added Chapters:</h3>
            <ul className="border rounded-lg p-3 space-y-2 max-h-64 overflow-y-auto">
              {chapters.map((c, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-2 rounded"
                >
                  {editingIndex === index ? (
                    <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => handleSaveChapter(index)}
                          className="text-green-500 hover:scale-110 transition"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-500 hover:scale-110 transition"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 w-full">{c}</span>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => handleEditChapter(index)}
                          className="text-blue-500 hover:scale-110 transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(index)}
                          className="text-red-500 hover:scale-110 transition"
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Save Chapters
        </button>
      </form>
    </div>
  );
};

export default AddChapterPage;
