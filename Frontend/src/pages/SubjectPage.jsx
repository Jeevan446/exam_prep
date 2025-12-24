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
    <div className=" w-full flex items-center  justify-center bg-amber-200 ">
      <NavBar />

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
  className="
    mt-[100px]
    px-4
    transition-all duration-300

    w-[80%]

    ml-16

    lg:w-[70%]
     bg-amber-700 
     
  "
>
             <h1 className=" text-xl">Select your subjects</h1>
            {
                data.length>0?data.map((item,key)=>(<h1  key={key}><Link to='' className=" bg-yellow-500">{item}</Link></h1>)):<h1>Sorry no subject found</h1>
            }
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default SubjectPage;
