import { Link } from "react-router-dom";
import Footer from "./Footer";

function HomeContent() {
  const btnClass = "btn btn-secondary shadow-lg";
  const homeItems = [
    {
      id: "demo",
      title: "Demo Mode",
      to: "/examtype",
      prefix: "The",
      highlight: "Demo Mode",
      suffix:
        "contains different lists of exam types, subjects, and questions to get you started.",
    },
    {
      id: "practice",
      title: "Practice Mode",
      to: "/practice/examtype",
      prefix: "Access",
      highlight: "Practice Sessions",
      suffix:
        "to improve your speed and accuracy with real-time feedback.",
    },
    {
      id: "weekly",
      title: "Weekly Test",
      to: "/weeklymode/examtype",
      prefix: "Review your results and track your progress over time with our",
      highlight: "Weekly Tests",
      suffix: ".",
    },
  ];

  return (
    <div className="transition-all duration-300 min-h-screen flex flex-col">
      
      {/* Main Content Container */}
      <main className="flex-grow mt-4  md:p-10 md:mt-10 ">
        <div className=" lg:max-w-5xl mx-auto space-y-8 bg-base-300 p-6 md:p-12 rounded-xl shadow-2xl border border-base-content/10">
          
          {homeItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors"
            >
              <p className="text-lg text-center md:text-left max-w-lg">
                {item.prefix}{" "}
                <span className="text-secondary font-bold">{item.highlight}</span>{" "}
                {item.suffix}
              </p>
              <Link to={item.to} className={btnClass}>{item.title}</Link>
            </div>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomeContent;