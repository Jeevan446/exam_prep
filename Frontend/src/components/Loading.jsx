import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white gap-6">
      <div className="relative">
        <Loader2 className="animate-spin text-blue-600" size={56} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
        </div>
      </div>
      <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">Assembling Test</p>
    </div>
  );
};

export default Loading;
