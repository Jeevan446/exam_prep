import { FaBarsStaggered } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { SiGitbook } from "react-icons/si"; //book icon
import { AiFillNotification } from "react-icons/ai"; //speaker icon

function SideBar({ isOpen, setIsOpen }) {
    return (
        <div className="sidebar-container flex">
            <div className={`fixed top-16 left-0 h-full bg-gray-400 transition-all duration-300 text-black font-bold z-20 border-r-2 border-gray-500
                ${isOpen ? "w-48" : "w-16"}
                md:${isOpen ? "w-64" : "w-24"}
                `}>

                <div className="flex justify-between items-center px-4 mt-4 mb-6 ">
                    <h2 className={`text-xl font-bold cursor-pointer ${isOpen ? "block" : "hidden"}`}>
                        MENU
                    </h2>

                    <button className="block p-1" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoCloseCircleOutline size={24} /> : <FaBarsStaggered size={24} />}
                    </button>
                </div>

                <nav className="border-b-2 border-t-2 border-gray-600">
                    <ul>
                        <li className="flex items-center p-4 hover:bg-gray-600 cursor-pointer hover:text-white transition-all duration-600">
                            <FaHome size={24} />
                            <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                                Home
                            </span>
                        </li>
                    </ul>
                </nav>

                <nav className="border-b-2 border-gray-600">
                    <ul>
                        <li className="flex items-center p-4 hover:bg-gray-600 cursor-pointer hover:text-white transition-all duration-600">
                            <SiGitbook  size={24} />
                            <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                                Courses
                            </span>
                        </li>
                    </ul>
                </nav>

                <nav className="border-b-2 border-gray-600">
                    <ul>
                        <li className="flex items-center p-4 hover:bg-gray-600 cursor-pointer hover:text-white transition-all duration-600">
                            <AiFillNotification size={24} />
                            <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                                Notice
                            </span>
                        </li>
                    </ul>
                </nav>


                <nav className="border-b-2 border-gray-600">
                    <ul>
                        <li className="flex items-center p-4 hover:bg-gray-600 cursor-pointer hover:text-white transition-all duration-600">
                            <FaUserAlt size={24} />
                            <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                                About Us
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );

}

export default SideBar;     