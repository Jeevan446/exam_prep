import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";

const NoticePage = ({ isOpen, setIsOpen }) => {
  const [notice, setNotice] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(`/api/user/getnotice`);

      //   console.log(response);
      //   console.log(response.data.data.message)
      const n = response.data.data.map((e) => {
        return e.message;
      });
      setNotice(n);
      //   console.log(n);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      <NavBar />

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div>
        {notice.map((item, key) => (
          <div key={key}>{item}</div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default NoticePage;
