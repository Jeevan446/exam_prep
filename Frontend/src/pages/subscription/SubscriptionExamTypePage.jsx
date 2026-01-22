import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

function WeeklyExamTypePage() {
  const [data, setData] = useState([]);
  const [loading ,setLoading]=useState(true);

 

  useEffect(() => {
    async function fetchData() {
    try {
      const response = await axios.get("/api/setexam/getexamtype");
      setData(response.data.examTypes); 
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }
    fetchData();
  }, []);
  if(loading) {
   return  <Loading />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <SideBar />

      <div className="flex flex-col sm:mt-8 md:mt-10 lg:mt-12 gap-4 items-center justify-center flex-1 ">
        <div className="py-10 transition-all duration-300 w-[80%] lg:w-[70%] bg-base-300 border border-secondary/20 shadow-2xl rounded-xl flex flex-col gap-6 md:gap-8 items-center">
          <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-6">
            Please select your exam type:
          </h1>

          {data.map((item, key) => (
            <Link
              to={`/subscription/examtype/${item}`}
              key={key}
              state={{ examType: item }}
              className="border-secondary rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors text-xs md:text-sm lg:text-xl justify-center p-4 w-[90%] hover:text-secondary"
            >
              <span className="text-secondary">{key + 1}.</span>
              <span className="ml-2">{item.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WeeklyExamTypePage;
