import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { BookOpen } from "lucide-react"; //book icon
import Loading from "../../components/Loading";

function SubjectPage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);
  const [loading ,setLoading]=useState(true);
  const location = useLocation();
  const { examType } = location.state || {};

  async function fetchData() {
    try {
      const response = await axios.get(`/api/demomode/${examType}/subjects`);

      const names = response.data.subjects.map((item) => item.name);

      setData(names);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="w-full flex flex-col ">
      <NavBar />

      <SideBar />

      <div className="flex flex-col sm:mt-8 md:mt-10 lg:mt-12 gap-4 items-center justify-center">

      <div className="py-10 transition-all duration-300 w-[80%]  lg:w-[70%] border bg-base-300 border-secondary/20 shadow-2xl rounded-xl 
        flex flex-col gap-6 md:gap-8 items-center"
       
      >
            <div className="flex gap-4 items-center justify-center">
              <h1 className="sm:text-xl  md:text-2xl lg:text-3xl text-primary font-bold">
                Select your subject
              </h1>
              <BookOpen className="size-7 text-secondary" />
            </div>

            {data.length > 0 ? (
              data.map((item, key) => (
                <Link
                to="/chapters"
                state={{ examType: examType, subject: item }}
                className="border-secondary rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors text-xs md:text-sm lg:text-xl justify-center p-4 w-[90%] hover:text-secondary"
                key={key}
                >
                  <span className="text-secondary">{key + 1}.</span>
                  <span className="ml-2">{item}</span>
                </Link>
              ))
            ) : (
              <h1>Sorry no subject found</h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default SubjectPage;
