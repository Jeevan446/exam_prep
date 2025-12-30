import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { FaListAlt } from "react-icons/fa"; //booklist icon.

function ChaptersPage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);

  const location = useLocation();

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/demomode/${location.state.examType}/${location.state.subject}/chapters`
      );

      setData(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="w-full flex flex-col ml-auto mr-auto">
      <NavBar />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className=" flex flex-col sm:mt-5 md:mt-10 gap-4 items-center justify-center">

        <div className=" flex mt-20 gap-4 items-center justify-center">
            <h1 className=" sm:text-xl  md:text-2xl text-gray-600 font-bold">
                Select a chapter :
            </h1>

            <FaListAlt className="md:w-8 md:h-8 sm:w-4 sm:h-4" />
        </div>

        <div
          className={`mt-[30px]  py-10 transition-all duration-300 w-[80%] ml-16 lg:w-[70%] bg-gray-300 border-2 border-black flex flex-col gap-6 md:gap-8 items-center
           ${isOpen ? "lg:ml-50 duration-300" : "lg:ml-20 duration-300"}`}
        >
          {data.length > 0 ? (
            data.map((item, key) => (
              <Link
              to='/examtype/chapter/questionpage'
              state={{examType:location.state.examType,subject:location.state.subject,chapter:item.name}}
                key={key}
                className=" border rounded border-black sm:text-sm md:text-xl p-4 w-[90%] hover:bg-black hover:text-white duration-500"
              >
                <span>{key + 1}.</span>
                <span className="ml-2">{item.name}</span>
              </Link>
            ))
          ) : (
            <h1>Sorry no chapters found</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChaptersPage;
