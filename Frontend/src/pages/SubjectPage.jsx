import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";


function SubjectPage({ isOpen, setIsOpen }) {

    const [data, setData] = useState([]);
    const location = useLocation();
    const { examType } = location.state || {};

  async function fetchData() {

    try {
      const response = await axios.get(
        `http://localhost:3000/api/demomode/${examType}/subjects`
      );


      const names = response.data.subjects.map(item => item.name);

      setData(names)
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
            flex-1
            mt-20 md:mt-[15vh] p-6 md:p-10
            mx-4 md:mx-40 
            ml-18
            {} ${isOpen ? "lg:ml-80 duration-300" : "lg:ml-40 duration-300"}
          `}
            >
             <h1>Select your subjects</h1>
            {
                data.length>0?data.map((item,key)=>(<h1  key={key}><Link to=' '>{item}</Link></h1>)):<h1>Sorry no subject found</h1>
            }
            </main>
            <Footer />
        </div>
    );
}

export default SubjectPage;