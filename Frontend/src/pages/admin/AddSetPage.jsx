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
        const res = await axios.get("/api/demomode/getexams");
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
      await axios.post("/api/setexam/upload", formData, {
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
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="flex">
        <SideBar />
        
        <main className="flex-1 p-6 flex justify-center mt-5 md:mt-10">
          <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300">
            <div className="card-body gap-6">
              
              <div className="flex flex-col gap-1">
                <h2 className="card-title text-2xl font-bold text-primary">Upload Exam Set</h2>
                <p className="text-sm opacity-60">Add new question sets via Excel files (.xlsx, .xls)</p>
              </div>

              <div className="divider my-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exam Category */}
                <div className="form-control">
                  <label className="label font-semibold">Exam Type</label>
                  <select 
                    className="select select-bordered focus:select-primary" 
                    value={examType} 
                    onChange={(e) => setExamType(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {examTypes.map((exam) => (
                      <option key={exam._id} value={exam.name}>{exam.name}</option>
                    ))}
                  </select>
                </div>

                {/* Set Access Type */}
                <div className="form-control">
                  <label className="label font-semibold">Access Level</label>
                  <select 
                    className="select select-bordered focus:select-primary" 
                    value={setType} 
                    onChange={(e) => setSetType(e.target.value)}
                  >
                    <option value="">Select Set Type</option>
                    <option value="paid" className="text-warning">Paid</option>
                    <option value="live" className="text-error font-bold">Live</option>
                    <option value="offline" className="text-success">Offline</option>
                  </select>
                </div>

                {/* Marks and Time */}
                <div className="form-control">
                  <label className="label font-semibold">Time Duration</label>
                  <label className="input input-bordered flex items-center gap-2">
                    <input type="number" className="grow" placeholder="60" value={examTime} onChange={(e) => setExamTime(e.target.value)} />
                    <span className="badge badge-ghost">Mins</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label font-semibold">Total Score</label>
                  <label className="input input-bordered flex items-center gap-2">
                    <input type="number" className="grow" placeholder="100" value={fullMarks} onChange={(e) => setFullMarks(e.target.value)} />
                    <span className="badge badge-ghost">Marks</span>
                  </label>
                </div>
              </div>

              {/* Conditional Live Scheduling Section */}
              {setType === "live" && (
                <div className="bg-error/5 border border-error/20 p-4 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-sm font-bold text-error flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                    </span>
                    Live Exam Scheduling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label-text text-xs mb-1 opacity-70">START TIME</label>
                      <input type="datetime-local" className="input input-bordered input-sm" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className="form-control">
                      <label className="label-text text-xs mb-1 opacity-70">END TIME</label>
                      <input type="datetime-local" className="input input-bordered input-sm" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* File Upload Area */}
              <div className="form-control w-full mt-4">
                <label className="label font-semibold">Excel Data Source</label>
                <input 
                  id="fileInput" 
                  type="file" 
                  accept=".xlsx,.xls" 
                  className="file-input file-input-bordered file-input-primary w-full shadow-sm" 
                  onChange={(e) => setFile(e.target.files[0])} 
                />
                <label className="label">
                  <span className="label-text-alt opacity-50">Upload the standardized .xlsx template</span>
                </label>
              </div>

              <div className="card-actions justify-end mt-4">
                <button 
                  className={`btn btn-primary btn-block shadow-lg ${loading ? "loading" : ""}`} 
                  onClick={handleUpload} 
                  disabled={loading}
                >
                  {!loading && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
                  {loading ? "Processing Upload..." : "Upload Exam Set"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSetPage;