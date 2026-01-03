import toast from "react-hot-toast";

function Footer() {
  return (
    <footer
      className="w-full mt-20 py-8 transition-all duration-300 border-y border-primary/20 bg-base-200/50 flex flex-col items-center"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-sm md:text-base text-base-content/50 font-medium tracking-wide">
            © 2026 | EntrancePrep | All rights reserved.
          </p>
        </div>
      </div>

      {/* Testing Buttons Section */}
      <div className="flex gap-4 pb-4">
        <button 
          onClick={() => toast.success("congrats")} 
          className="btn btn-ghost btn-xs text-primary/60 hover:text-primary transition-colors"
        >
          click me
        </button>
        <button 
          onClick={() => toast.error("failed")} 
          className="btn btn-ghost btn-xs text-error/60 hover:text-error transition-colors"
        >
          Test me
        </button>
      </div>
    </footer>
  );
}

export default Footer;