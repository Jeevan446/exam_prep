import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";

const EditQuestionPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "This is question 1" },
    { id: 2, text: "This is question 2" },
    { id: 3, text: "This is question 3" },
    { id: 4, text: "This is question 4" },
    { id: 5, text: "This is question 5" },
  ]);
  const [loading ,setLoading] =useState(true);

  // ===================Data Fetch=====================

  // const fetchQuestions = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("http://localhost3000/api/demomode/"); 
  //     setQuestions(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching questions:", error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuestions();
  // }, []);

  // if (loading) {
  //   return <Loading />
  // }


  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");




  // Delete question
  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Start editing
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edit
  const handleSave = (id) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: editText } : q))
    );
    setEditingId(null);
    setEditText("");
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  return (



    <div className="flex flex-col items-center gap-4 mt-[10vh] px-3">
      <p className="text-2xl uppercase font-bold">All Questions</p>

      {questions.map((q) => (
        <div
          key={q.id}
          className="
            flex justify-between items-center
            w-full sm:w-[90%] md:w-[70%] lg:w-[60%]
            border p-3 rounded
            bg-white shadow-sm
          "
        >
          {/* Question text or edit input */}
          <div className="text-sm sm:text-base break-words flex-1">
            {editingId === q.id ? (
              <input
                type="text"
                className="border p-1 rounded w-[95%]"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              q.text
            )}
          </div>

          {/* Action icons */}
          <div className="flex gap-4 text-xl">
            {editingId === q.id ? (
              <>
                <div className="flex gap-5">

                  <button
                    className="text-green-500 hover:scale-110 transition"
                    onClick={() => handleSave(q.id)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="text-gray-500 hover:scale-110 transition"
                    onClick={handleCancel}
                  >
                    <FaTimes />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="text-red-500 hover:scale-110 transition"
                  onClick={() => handleDelete(q.id)}
                >
                  <MdOutlineDelete />
                </button>
                <button
                  className="text-blue-500 hover:scale-110 transition"
                  onClick={() => handleEdit(q.id, q.text)}
                >
                  <FaRegEdit />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>

  );
};

export default EditQuestionPage;
