import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

function WeeklySetNamePage({ isOpen, setIsOpen }) {
  const location = useLocation();
  const router =useParams();
  const examType = location.state?.examType;
  const [sets, setSets] = useState([]);
  const [loading,setLoading] =useState(true);

  // Check if a set is currently live
  const isSetLive = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  useEffect(() => {
     async function fetchSets() {
    try {
      const response = await axios.get(`/api/setexam/${examType}/live`);
      console.log(response.data)
      setSets(response.data.sets);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }
    if (examType) fetchSets();
  }, [examType]);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col sm:mt-8 md:mt-10 lg:mt-12 gap-4 items-center justify-center flex-1">
        <div className="py-10 transition-all duration-300 w-[80%] lg:w-[70%] bg-base-300 border border-secondary/20 shadow-2xl rounded-xl flex flex-col gap-6 md:gap-8 items-center">
          <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-6">
            Sets for exam type: {examType.toUpperCase()}
          </h1>

          {sets.length === 0 && (
            <div className="text-red-500 font-bold">No sets available for this exam type.</div>
          )}

          {sets.map((set, key) => {
            const isLive = isSetLive(set.startTime, set.endTime);
            
            return isLive ? (
              <Link
                to={`/weeklymode/${router.examtype}/set/${set.setId}`}
                key={set.setId}
                state={{ setName: set.setName, examType }}
                className="border-secondary rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors text-xs md:text-sm lg:text-xl justify-center p-4 w-[90%] hover:text-secondary flex items-center justify-between"
              >
                <div>
                  <span className="text-secondary">{key + 1}.</span>
                  <span className="ml-2">{set.setName}</span>
                </div>
                <span className="bg-green-500 text-white text-xs md:text-sm px-3 py-1 rounded-full font-semibold">
                  Live
                </span>
              </Link>
            ) : (
              <div
                key={set.setId}
                className="border-secondary rounded-lg bg-base-100 border border-gray-400/20 text-xs md:text-sm lg:text-xl justify-center p-4 w-[90%] flex items-center justify-between opacity-50 cursor-not-allowed"
              >
                <div>
                  <span className="text-gray-500">{key + 1}.</span>
                  <span className="ml-2 text-gray-500">{set.setName}</span>
                </div>
                <span className="bg-red-500 text-white text-xs md:text-sm px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                  <Lock size={16} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WeeklySetNamePage;
