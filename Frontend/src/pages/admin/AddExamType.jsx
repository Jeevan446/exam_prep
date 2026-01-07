import axios from "axios";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";

function AddExamTypePage() {
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
    <div className="min-h-screen flex flex-col ">
      <NavBar />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar - often hidden or toggled on mobile */}
        <div className="hidden md:block">
           <SideBar />
        </div>

        <main className="flex-1 p-4 sm:p-8 flex justify-center items-start">
          <div className="w-full max-w-xl"> 
            

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full bg-base-300 p-6 border border-secondary/75 rounded-lg"
            >
              <h1 className="text-xl md:text-2xl text-secondary font-bold mb-6 text-center">
                Add New Exam Type
              </h1>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ghost md:hidden">Exam Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Exam Type Name"
                  className="p-3 border rounded-xl w-full border-secondary focus:ring-2 focus:ring-secondary outline-none"
                  disabled={submitting}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ghost md:hidden">Description</label>
                <textarea
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder="Description (optional)"
                  className="p-3 border rounded-xl w-full border-secondary focus:ring-2 focus:ring-secondary outline-none"
                  rows={4}
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-secondary py-3 px-6 rounded font-semibold transition-all active:scale-95 disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Exam Type"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddExamTypePage;