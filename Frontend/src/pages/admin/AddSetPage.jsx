import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar"
import toast from "react-hot-toast";

const AddSetPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
 


  // Optional: get JWT token from localStorage
  const token = localStorage.getItem("token"); // replace with your method if different

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error(error || "file not uploaded",{
          duration: 1500,
      });
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await axios.post(
        "http://localhost:3000/api/setexam/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // attach JWT
          },
        }
      );

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.response?.data?.error || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <SideBar />
      <div className="p-4 max-w-xl mx-auto">
        <div className="border-2 border-secondary p-3 rounded">

          <h2 className="text-2xl font-bold mb-4">Upload Exam Set</h2>

          <div className="flex justify-between mt-2">
            <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
            <button
              className="mt-4 btn btn-info md:mt-0"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        {response && (
          <div className="mt-4 p-2 border border-sucess bg-green-100 rounded">
            <h3 className="font-bold">Success!</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSetPage;
