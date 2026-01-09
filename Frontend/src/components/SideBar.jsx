import { Link } from "react-router-dom";
import {
  House,
  BookOpen,
  Megaphone,
  UsersRound,
  PanelLeftClose,
  CircleUserRound,
  LogOut,
  ChevronDown,
  ChevronUp,
  LogIn,
} from "lucide-react";
import { useSidebar } from "../context/sidebarContext";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const availabletheme = [
  "forest",
  "valentine",
  "sunset",
  "dim",
  "night",
  "business",
  "dracula",
  "halloween",
  "synthwave",
  "dark",
  "winter",
  "autumn",
  "cmyk",
  "fantasy",
  "lofi",
  "garden",
  "valentine",
  "corporate",
  "emerald",
  "cupcake",
];

function SideBar() {
  const { changeTheme } = useTheme();
  const { isOpen, closeSidebar } = useSidebar();
  const { logout, user, login } = useUser();
  const [isDroppedDown, setIsDroppedDown] = useState(false);
  const [themeDropDown, setThemeDropDown] = useState(false);

  const linkStyle =
    "btn btn-ghost flex items-center gap-4 px-4 w-full justify-start text-primary";

  useEffect(() => {
    console.log(isDroppedDown);
  }, [isDroppedDown]);

  const toggleDropDown = () => {
    setIsDroppedDown((prev) => !prev);
  };

  const handleThemeDropDown = () => {
    setThemeDropDown((prev) => !prev);
  };

  // const handleOnClick = () => {
  //   // closeSidebar();
  //   toggleDropDown();
  //
  // }
  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 left-0 h-screen w-64 
          bg-base-200 border-r border-base-content/10
          transition-transform duration-300
          z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className=" relative p-4 pt-2 md:pt-10 flex flex-col gap-2">
          <div className=" flex justify-between items-center p-7">
            <span className="font-bold text-xl font-mono text-ghost uppercase tracking-tight">
              Menu
            </span>
            <button onClick={closeSidebar}>
              <PanelLeftClose />
            </button>
          </div>

          <Link to="/" className={linkStyle} onClick={closeSidebar}>
            <House size={20} />
            <span>Home</span>
          </Link>

          <Link to="/courses" className={linkStyle} onClick={closeSidebar}>
            <BookOpen size={20} />
            <span>Courses</span>
          </Link>

          <Link to="/notice" className={linkStyle} onClick={closeSidebar}>
            <Megaphone size={20} />
            <span>Notice</span>
          </Link>

          <Link to="/about" className={linkStyle} onClick={closeSidebar}>
            <UsersRound size={20} />
            <span>About Us</span>
          </Link>


          <div className="border-t  border-primary py-5 space-y-5">
            <div className="flex gap-1 w-full px-4 justify-between text-primary">
              <div className="flex gap-4 items-center">
                <UsersRound size={20} />
                <span className="font-bold">Theme</span>
              </div>
              <div className="flex items-center" onClick={handleThemeDropDown}>
                {themeDropDown ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {/* ThemeSelection */}

            <AnimatePresence>
              {themeDropDown && (
                <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="
                h-[15vh]
                overflow-y-auto overflow-x-hidden
                scrollbar-thin
                scrollbar-thumb-primary/40
                scrollbar-track-base-200
                hover:scrollbar-thumb-base-content/60
                px-14
                
                "
                >
                  {availabletheme.map((mytheme) => (
                    <motion.div
                    key={mytheme}
                    onClick={() => changeTheme(mytheme)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer text-primary px-2 py-1 hover:bg-base-200 rounded"
                    >
                      {mytheme}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div
              to=""
              className={"flex flex-col gap-1 w-full  text-primary "}
              onClick={toggleDropDown}
              >
              <div className="flex justify-between hover:bg-[#393434] rounded-full py-3 px-4 ">
                <div className="flex gap-2 items-center">
                  <CircleUserRound />
                  <span className="font-bold">Account</span>
                </div>
                {isDroppedDown ? <ChevronUp /> : <ChevronDown />}
              </div>

              <AnimatePresence>
                {isDroppedDown && (
                  <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {user ? (
                      <Link
                      to="/"
                      className="btn btn-ghost flex items-center px-4 w-[90%] justify-between text-ghost"
                      onClick={logout}
                      >
                        <span className="tracking-wide font-bold">Logout</span>
                        <LogOut size={20} className="animate-bounce" />
                      </Link>
                    ) : (
                      <Link
                      to="/login"
                      className="btn btn-ghost flex items-center px-4 w-[90%] justify-between text-ghost"
                      onClick={login}
                      >
                        <span className="tracking-wide font-bold">Login</span>
                        <LogIn size={20} className="animate-bounce" />
                      </Link>
                    )}

                    <div className={`${linkStyle} gap-1`}>
                      {user?.email && (
                        <span>
                          Email: {user.email.slice(0, 10)}
                          {user.email.length > 10 && "..."}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
