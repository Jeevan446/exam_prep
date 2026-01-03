import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function ExamTypePage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);

  // Fetch exams from API
  async function fetchData() {
    try {
      const response = await axios.get(
        "/api/demomode/getexams"
      );
      console.log(response.data.examTypes);
      setData(response.data.examTypes);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col ml-auto mr-auto bg-base-100">
      <NavBar />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

         {/* main */}
     
      <div className=" flex flex-col sm:mt-5 md:mt-10 gap-4 items-center justify-center">

        <div className=" flex mt-20 gap-4 items-center justify-center">
          <h1 className=" sm:text-xl  md:text-2xl text-secondary font-bold">
            Please select your exam type :
          </h1>
        </div>

        
          
        
          {/* listitem */}
          <div className={`mt-[30px]  py-10 transition-all duration-300 w-[80%] ml-16 lg:w-[70%] bg-base-300 border border-secondary flex flex-col gap-6 md:gap-8 items-center
        ${isOpen ? "lg:ml-50 duration-300" : "lg:ml-20 duration-300"}`} >
            {data.map((item, key) => (
              <div key={key} className="border rounded border-secondary bg-base-100 sm:text-sm md:text-xl p-4 w-[90%]">
                <div>

                  <div className="flex-1 text-2xl font-bold underline text-secondary">
                    {item.name}
                  </div>

                  <div className="flex-1 mt-2 text-xl ">{item.discription}</div>

                </div>

                <Link to="/subjects" state={{ examType: item.name }}>
                  <button className="btn btn-secondary">
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
