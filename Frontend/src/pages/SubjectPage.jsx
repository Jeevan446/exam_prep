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
    <div className=" w-full flex flex-col items-center  justify-center ">
      <NavBar />

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className=" flex mt-30 gap-4 items-center justify-center">
        <h1 className=" sm:text-xl  md:text-2xl text-gray-600 font-bold">
          Select your subjects
        </h1>
        <SiGitbook className="md:w-8 md:h-8 sm:w-4 sm:h-4" />
      </div>
      <main
        className={`mt-[30px]  py-10 transition-all duration-300 w-[80%] ml-16 lg:w-[70%] bg-gray-300 border-2 border-black flex flex-col gap-6 md:gap-8 items-center
        ${isOpen ? "lg:ml-50 duration-300" : "lg:ml-20 duration-300"}`}
      >
        {data.length > 0 ? (
          data.map((item, key) => (
            <Link
              to="/chapters"
              state={{ examType: examType, subject: item}}
            className=" border rounded border-black sm:text-sm md:text-xl p-4 w-[90%] hover:bg-black hover:text-white duration-500"
              key={key}
              >
                <span>{key + 1}.</span>
                <span className="ml-2">{item}</span>
            </Link>
          ))
        ) : (
          <h1>Sorry no subject found</h1>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SubjectPage;
