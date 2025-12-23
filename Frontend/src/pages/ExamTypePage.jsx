import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { Fragment } from "react"; // Lets you group elements without a wrapper node.
import { Link } from "react-router-dom";

function ExamTypePage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);

  // Fetch exams from API
  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/demomode/getexams"
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
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex flex-1">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main
          className={`
            flex-1
            mt-20 md:mt-[15vh] p-6 md:p-10
            mx-4 md:mx-40 
            ml-18
            {} ${isOpen ? "lg:ml-80 duration-300" : "lg:ml-40 duration-300"}
          `}
        >
          <h1 className="font-bold  text-2xl sm:te text-gray-700 mb-6">
            Please select your exam type:
          </h1>

          <div
            className={` Exam-Type-Details
              flex flex-col gap-8
              p-6 md:p-10
              bg-gray-300 border-2 border-gray-400 rounded-xl drop-shadow-2xl
              min-h-[60vh]
            `}>
              {data.map((item, key) => (

                <Fragment key={key}>
                  <Link to="/subjects"
                    state={{ examType: item.name }}
                  >
                  <div className=""
                    
                  >
                      {item.name}
                  </div>
                  <div>{item.discription}</div>
                  </Link>
                </Fragment>
              ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default ExamTypePage;
