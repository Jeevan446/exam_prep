import NavBar from "../components/NavBar";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { useUser } from "../context/userContext";

function Homepage({ isOpen, setIsOpen }) {
        const {token ,loading} =useUser();
        console.log(token);
    return(
        <div className="flex flex-col justify-baseline">
            <NavBar />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <HomeContent  isOpen={isOpen} setIsOpen={setIsOpen} />
            {/* <Footer /> */}
        </div>
    );
}
export default Homepage;