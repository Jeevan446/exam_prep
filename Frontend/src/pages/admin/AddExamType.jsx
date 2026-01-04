import axios from "axios";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/NavBar";
import toast, { Toaster } from "react-hot-toast";


function AddExamTypePage({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Exam type name is required");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post("/api/demomode/addexamtype", {
        name: name.trim(),
        discription: discription.trim(),
      });

      toast.success(response.data.message || "Exam type added successfully");

      // Reset form
      setName("");
      setDiscription("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add exam type");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col ml-auto mr-auto bg-base-100">
      
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="sm:text-xl md:text-2xl text-secondary font-bold mb-6">
          Add New Exam Type
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-[80%] lg:w-[50%] bg-base-200 p-6 rounded-lg shadow"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Exam Type Name"
            className="p-3 border rounded"
            disabled={submitting}
          />

          <textarea
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="Description (optional)"
            className="p-3 border rounded"
            rows={3}
            disabled={submitting}
          />

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-secondary"
          >
            {submitting ? "Adding..." : "Add Exam Type"}
          </button>
        </form>
      </div>

    
    </div>
  );
}

export default AddExamTypePage;