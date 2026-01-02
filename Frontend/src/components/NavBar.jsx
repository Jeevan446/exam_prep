import { Link } from "react-router-dom";
function NavBar() {
    // Added responsive text sizes and horizontal padding
    const btnClass = "btn btn-info px-3 md:px-6 py-2 cursor-pointer  text-xs md:text-base";


    return (
        <div className="bg-base-300 flex justify-between items-center p-3 h-16 z-20 fixed top-0 w-full ">
            <div className="flex items-center font-bold">
                <p className="text-primary">LOGO</p>
            </div>

            {/* Hidden on mobile, flex on medium (md) screens and up */}
            <div className="hidden lg:flex justify-center items-center gap-4 lg:gap-16">
                <button className={btnClass}>
                    <span className="relative">COURSES</span>
                </button>
                <Link to="/notice">
                    <button className={btnClass}>
                        <span className="relative">NOTICE</span>
                    </button>
                </Link>
                <button className={btnClass}>
                    <span className="relative">ABOUT US</span>
                </button>
            </div>

            {/* Smaller gap for mobile, larger for desktop */}
            <div className="flex gap-2 md:gap-12 items-center">
                <button className={btnClass}>
                    <span className="relative">SUBSCRIPTION</span>
                </button>
                <Link to="/signup">
                    <button className={btnClass}>

                        <span className="relative">ACCOUNT</span>

                    </button>
                </Link>

            </div>
        </div>
    );
}

export default NavBar;