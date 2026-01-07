import { Link } from "react-router-dom";
import { Megaphone, Users, CreditCard, CircleUserRound, GraduationCap } from "lucide-react"
// import SideBar from "./SideBar";
import { Menu } from "lucide-react";
import { useSidebar } from "../context/sidebarContext";


function NavBar() {
    const { toggleSidebar } = useSidebar();


    return (
        <header className="bg-base-300 border-b border-base-content/20 sticky top-0 z-20 ">
            <div className="p-3 mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded hover:bg-white/10 text-primary"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-primary font-mono tracking-tighter md:text-3xl">
                        EntrixNP
                    </h1>
                    </div>
                    <div className=" flex items-center gap-4">
                        <Link to="" className="hidden lg:flex items-center gap-2 btn btn-primary ">
                            <span>COURSES</span>
                            <GraduationCap className="size-5" />
                        </Link>

                        <Link to="/notice" className=" hidden lg:flex items-center gap-2 btn btn-primary">
                            <span className="block">NOTICE</span>
                            <Megaphone className="size-5" />
                        </Link>

                        <Link to="" className=" hidden lg:flex items-center gap-2 btn btn-primary">
                            <span>ABOUT US</span>
                            <Users className="size-5" />
                        </Link>

                        <Link to="" className="flex items-center gap-2 md:btn btn-primary">
                            <span className="hidden md:block md:text-base-100">SUBSCRIPTION</span>
                            <CreditCard className="size-8 text-primary md:size-5 md:text-base-100 " />
                        </Link>

                        <Link to="/signup" className="flex items-center gap-2 md:btn btn-primary ">
                            <span className="hidden md:block md:text-base-100">ACCOUNT</span>
                            <CircleUserRound className="size-8 text-primary md:size-5 md:text-base-100 " />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;