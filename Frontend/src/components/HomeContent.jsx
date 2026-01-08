import { Link } from "react-router-dom";
import Footer from "./Footer";

function HomeContent() {
  // Cleaned up DaisyUI button classes
  const btnClass = "btn btn-secondary shadow-lg";

  return (
    <div className="transition-all duration-300 min-h-screen  flex flex-col">
      
      {/* Main Content Container */}
      <main className="flex-grow mt-4  md:p-10 md:mt-10 ">
        <div className=" lg:max-w-5xl mx-auto space-y-8 bg-base-300 p-6 md:p-12 rounded-xl shadow-2xl border border-base-content/10">
          
          {/* Row 1: Demo */}
          <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-6 md:p-6 rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors">
            <p className="text-lg text-center md:text-left max-w-lg">
              The <span className="text-secondary font-bold">Demo Mode</span> contains different lists of exam types, subjects, and questions to get you started.
            </p>
            <Link to="/examtype" className={btnClass}>Demo Mode</Link>  
          </div>

          {/* Row 2: Practice */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors">
            <p className="text-lg text-center md:text-left max-w-lg">
              Access <span className="text-secondary font-bold">Practice Sessions</span> to improve your speed and accuracy with real-time feedback.
            </p>
            <Link to="/practice/examtype" className={btnClass}>Practice Mode</Link>
          </div>

          {/* Row 3: Weekly */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors">
            <p className="text-lg text-center md:text-left max-w-lg">
              Review your results and track your progress over time with our <span className="text-secondary font-bold">Weekly Tests</span>.
            </p>
            <Link to="/examtype" className={btnClass}>Weekly Test</Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomeContent;