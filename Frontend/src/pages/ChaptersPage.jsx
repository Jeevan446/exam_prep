import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { List } from "lucide-react";

function ChaptersPage({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);

  const location = useLocation();

  async function fetchData() {
    try {
      const response = await axios.get(
        `/api/demomode/${location.state.examType}/${location.state.subject}/chapters`
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

      <div className="flex flex-col sm:mt-8 md:mt-10 lg:mt-12 gap-4 items-center justify-center">

        <div className=" py-10 transition-all duration-300 w-[80%]  lg:w-[70%] border bg-base-300 border-secondary/20 shadow-2xl rounded-xl 
          flex flex-col gap-6 md:gap-8 items-center
         "
        >
          <div className="flex gap-4 items-center justify-center">
            <h1 className="sm:text-xl  md:text-2xl lg:text-3xl text-primary font-bold">
              Select a chapter :
            </h1>
            <List className="size-7 text-secondary" />
          </div>

          {data.length > 0 ? (
            data.map((item, key) => (
              <Link
                to='/examtype/chapter/questionpage'
                state={{ examType: location.state.examType, subject: location.state.subject, chapter: item.name }}
                key={key}
                className="border-secondary rounded-lg bg-base-100 border border-secondary/20 hover:border-secondary/50 transition-colors text-xs md:text-sm lg:text-xl justify-center p-4 w-[90%] hover:text-secondary"
              >
                <span className="text-secondary">{key + 1}.</span>
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
