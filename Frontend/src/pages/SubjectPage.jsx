import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { SiGitbook } from "react-icons/si"; //book icon

function SubjectPage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { examType } = location.state || {};

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/demomode/${examType}/subjects`
      );

      const names = response.data.subjects.map((item) => item.name);

      setData(names);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`
            w-full
            bg-gray-900
          `}
      >
        <div className="flex ">
          <h1 className="font-bold  text-2xl text-gray-600 mb-6 mr-0">Select your subject</h1>
          <SiGitbook className=" w-[50px] h-[30px]" /> 
        </div>

        <div
          className={` Exam-Type-Details
              bg-gray-600 border-2 border-gray-400 rounded-xl drop-shadow-2xl

            `}
        >
          {data.length > 0 ? (
            data.map((item, key) => (
              <h1 key={key}>
                <Link to=""
                  className="border rounded w-[95%] border-gray-400 flex flex-col gap-2 p-4 hover:bg-gray-200 transition-colors"
                >
                <div className="cursor-pointer text-xl text-gray-600">
                  <span className=" mr-2">{key+1}.</span>
                  {item}
                </div>
                </Link>
              </h1>
            ))
          ) : (
            <h1>Sorry no subject found</h1>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SubjectPage;
