import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

function ExamTypePage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);
  const [loading,setLoading] =useState(true);

  // Fetch exams from API
  async function fetchData() {
    try {
      const response = await axios.get(
        "/api/demomode/getexams"
      );
      console.log(response.data.examTypes);
      setData(response.data.examTypes);
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
    <div className=" w-full flex flex-col">
      <NavBar />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* main */}

      <div className=" flex flex-col sm:mt-8 md:mt-10 lg:mt-12 gap-4 items-center justify-center">

        <div className="py-10 transition-all duration-300 w-[80%]  lg:w-[70%] bg-base-300 border border-secondary/20 shadow-2xl rounded-xl 
            flex flex-col gap-6 md:gap-8 items-center
            ">

          {/*TOP MESSAGE*/}
          <div className=" flex  gap-4 items-center justify-center">
            <h1 className=" sm:text-xl  md:text-2xl lg:text-3xl text-primary font-bold">
              Please select your exam type :
            </h1>
          </div>

          {data.map((item, key) => (
            <div key={key} className=" flex flex-col gap-2 border-secondary rounded-lg bg-base-100  border border-secondary/20 hover:border-secondary/50 transition-colors text-sm md:text-xl lg:text-xl justify-center p-4 w-[90%]">
              <div>

                <div className="flex-1 font-bold underline text-secondary">
                  {item.name}
                </div>

                <div className="flex-1 mt-2">
                  {item.discription}
                </div>

              </div>

              <Link to="/subjects" state={{ examType: item.name }} >
                <button className="btn btn-secondary shadow-lg text-xs md:text-sm lg:text-xl">
                  {item.name}
                </button>
              </Link>

            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExamTypePage;
