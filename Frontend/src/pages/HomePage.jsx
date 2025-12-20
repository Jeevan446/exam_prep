import NavBar from "../components/NavBar";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";

function Homepage() {
    return(
        <div className="flex flex-col justify-baseline">
            <NavBar />
            <HomeContent />
            <Footer />
        </div>
    );
}
export default Homepage;