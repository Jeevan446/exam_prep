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

  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        const res = await axios.get("/api/demomode/getexams");
        setExamTypes(res.data.examTypes || []);
      } catch (error) { toast.error("Failed to load exam types"); }
    };
    fetchExamTypes();
  }, []);

  // AUTO-CALCULATE END TIME
  useEffect(() => {
    if (setType === "live" && startTime && examTime) {
      const start = new Date(startTime);
      const end = new Date(start.getTime() + Number(examTime) * 60000);
      setEndTime(end.toISOString().slice(0, 16)); // Format for datetime-local
    }
  }, [startTime, examTime, setType]);

  const handleUpload = async () => {
    if (!file || !examType || !examTime || !fullMarks || !setType) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("examType", examType);
    formData.append("examTime", examTime);
    formData.append("fullMarks", fullMarks);
    formData.append("setType", setType);

    // Only send dates if Type is Live
    if (setType === "live") {
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
    }

    try {
      setLoading(true);
      await axios.post("/api/setexam/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      });
      toast.success(res.data.message);
      resetForm();
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "Network Error: Check Backend Console");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null); setExamType(""); setExamTime(""); setFullMarks("");
    setSetType(""); setStartTime(""); setEndTime("");
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6 flex justify-center mt-10">
          <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300">
            <div className="card-body gap-6">
              <h2 className="card-title text-2xl font-bold text-primary">Upload Exam Set</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-semibold">Exam Type</label>
                  <select className="select select-bordered" value={examType} onChange={(e) => setExamType(e.target.value)}>
                    <option value="">Select Category</option>
                    {examTypes.map((e) => <option key={e._id} value={e.name}>{e.name}</option>)}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-semibold">Access Level</label>
                  <select className="select select-bordered" value={setType} onChange={(e) => setSetType(e.target.value)}>
                    <option value="">Type</option>
                    <option value="paid">Paid</option>
                    <option value="live">Live</option>
                    <option value="free">Free</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-semibold">Duration (Mins)</label>
                  <input type="number" className="input input-bordered" value={examTime} onChange={(e) => setExamTime(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label font-semibold">Full Marks</label>
                  <input type="number" className="input input-bordered" value={fullMarks} onChange={(e) => setFullMarks(e.target.value)} />
                </div>
              </div>

              {setType === "live" && (
                <div className="grid grid-cols-2 gap-4 bg-error/5 p-4 rounded-lg">
                  <input type="datetime-local" className="input input-bordered" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  <input type="datetime-local" className="input input-bordered bg-base-200" value={endTime} readOnly />
                </div>
              )}

              <input id="fileInput" type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFile(e.target.files[0])} />
              <button className={`btn btn-primary ${loading ? "loading" : ""}`} onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AddSetPage;