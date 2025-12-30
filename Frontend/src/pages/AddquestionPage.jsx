import React from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const AddquestionPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-[10vh] px-3">

        <p className='text-2xl uppercase font-bold'> all questions</p>

      {/* Rendering questions */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="
            flex justify-between items-center
            w-full sm:w-[90%] md:w-[70%] lg:w-[60%]
            border p-3 rounded
            bg-white shadow-sm
          "
        >
          {/* Question text */}
          <div className="text-sm sm:text-base break-words">
            this is a question
          </div>

          {/* Action icons */}
          <div className="flex gap-4 text-xl">
            <button className="text-red-500 hover:scale-110 transition">
              <MdOutlineDelete />
            </button>
            <button className="text-blue-500 hover:scale-110 transition">
              <FaRegEdit />
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AddquestionPage;
