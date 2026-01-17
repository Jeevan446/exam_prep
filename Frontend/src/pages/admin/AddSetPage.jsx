import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import toast from "react-hot-toast";

const AddSetPage = () => {
  const [file, setFile] = useState(null);
  const [examTypes, setExamTypes] = useState([]);
  const [examType, setExamType] = useState("");
  const [examTime, setExamTime] = useState("");
  const [fullMarks, setFullMarks] = useState("");
  const [setType, setSetType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/demomode/getexams");
        setExamTypes(res.data.examTypes || []);
      } catch (error) {
        toast.error("Failed to load exam types");
      }
    };
    fetchExamTypes();
  }, []);

  const handleUpload = async () => {
    if (!file || !examType || !examTime || !fullMarks || !setType) {
      return toast.error("Please fill all required fields");
    }

    if (setType === "live" && (!startTime || !endTime)) {
      return toast.error("Live exams require start and end times");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("examType", examType);
    formData.append("examTime", examTime);
    formData.append("fullMarks", fullMarks);
    formData.append("setType", setType);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/setexam/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Exam set uploaded successfully");
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setExamType("");
    setExamTime("");
    setFullMarks("");
    setSetType("");
    setStartTime("");
    setEndTime("");
    document.getElementById("fileInput").value = ""; 
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="p-8 w-full max-w-2xl mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-lg space-y-4 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Upload Exam Set</h2>
            
            <select className="select select-bordered w-full" value={examType} onChange={(e) => setExamType(e.target.value)}>
              <option value="">Select Exam Type</option>
              {examTypes.map((exam) => (
                <option key={exam._id} value={exam.name}>{exam.name}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Time (mins)" className="input input-bordered" value={examTime} onChange={(e) => setExamTime(e.target.value)} />
              <input type="number" placeholder="Full Marks" className="input input-bordered" value={fullMarks} onChange={(e) => setFullMarks(e.target.value)} />
            </div>

            <select className="select select-bordered w-full" value={setType} onChange={(e) => setSetType(e.target.value)}>
              <option value="">Select Set Type</option>
              <option value="paid">Paid</option>
              <option value="live">Live</option>
              <option value="offline">Offline</option>
            </select>

            {setType === "live" && (
              <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" className="input input-bordered" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <input type="datetime-local" className="input input-bordered" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            )}

            <input id="fileInput" type="file" accept=".xlsx,.xls" className="file-input file-input-bordered w-full" onChange={(e) => setFile(e.target.files[0])} />

            <button className={`btn btn-primary w-full ${loading ? "loading" : ""}`} onClick={handleUpload} disabled={loading}>
              {loading ? "Processing..." : "Upload Exam Set"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSetPage;