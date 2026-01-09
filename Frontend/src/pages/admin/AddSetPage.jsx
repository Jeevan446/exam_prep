import React, { useState } from "react";
import axios from "axios";

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
      alert("Please select a file first!");
      return;
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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Exam Set</h2>

      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {response && (
        <div className="mt-4 p-2 border border-green-500 bg-green-100 rounded">
          <h3 className="font-bold">Success!</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 border border-red-500 bg-red-100 rounded">
          <h3 className="font-bold">Error!</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AddSetPage;
