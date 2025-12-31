import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[60px] w-[60px] border-8 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
