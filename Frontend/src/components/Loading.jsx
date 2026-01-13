import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
      <div className="flex flex-col items-center gap-4">
       
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-lg font-medium text-base-content">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
