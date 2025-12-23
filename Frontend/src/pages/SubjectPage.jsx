import { useLocation } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";


function SubjectPage({ isOpen, setIsOpen }) {
    const location = useLocation();
    const { examType } = location.state || {};
    console.log(examType);
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
                <h1>subject page</h1>
            </main>
            <Footer />
        </div>
    );
}

export default SubjectPage;