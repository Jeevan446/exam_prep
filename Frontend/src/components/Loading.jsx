import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        {/* DaisyUI Spinner: Uses the 'primary' color from your theme */}
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    </div>
  );
};

export default Loading;