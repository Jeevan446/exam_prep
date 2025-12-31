import React, { useState } from "react";

const AddSubject = () => {
  const [examType, setExamType] = useState(""); 
  const [subject, setSubject] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examType || !subject.trim()) {
      alert("Please select an exam type and enter a subject");
      return;
    }

    // Example: Send data to API
    console.log({ examType, subject });
    setExamType("");
    setSubject("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Subject</h2>

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

        {/* Subject Name Input */}
        <label className="block mb-2 font-medium">Subject Name</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject name"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
