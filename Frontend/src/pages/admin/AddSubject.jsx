import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddSubject = () => {
  const [examTypes, setExamTypes] = useState([]);
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch exam types
  const fetchExamTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/demomode/getexams");
      const arr = response.data.examTypes.map((item) => item.name);
      setExamTypes(arr);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load exam types.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamTypes();
  }, []);

  // Handle adding subject
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!examType || !subject.trim()) {
      toast.error("Please select an exam type and enter a subject");
      return;
    }
     

    try {
      setSubmitting(true);
      const response = await axios.post("/api/demomode/addsubject", {
        examtype: examType,
        name: subject.trim(),
        chapters: [],
      });

      toast.success(response.data.message || "Subject added successfully!");
      setSubject(""); 
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add subject");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Subject</h2>

        {/* Exam Type */}
        <label className="block mb-2 font-medium">Select Exam Type</label>
        {loading ? (
          <div className="w-full p-3 mb-4 text-center">Loading exam types...</div>
        ) : (
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
          >
            <option value="">-- Select Exam Type --</option>
            {examTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}

        {/* Subject Input */}
        <label className="block mb-2 font-medium">Subject Name</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject name"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting || !examType}
        />

        <button
          onClick={handleSubmit}
          disabled={submitting || loading || !examType}
          className={`w-full text-white p-3 rounded-lg transition ${
            submitting || loading || !examType
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {submitting ? "Adding..." : "Add Subject"}
        </button>
      </div>
    </div>
  );
};

export default AddSubject;
