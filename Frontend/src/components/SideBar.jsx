import { Link } from "react-router-dom";
import {
  House,
  BookOpen,
  Megaphone,
  UsersRound,
  PanelLeftClose
} from "lucide-react";
import { useSidebar } from "../context/sidebarContext";

function SideBar() {
  const { isOpen, closeSidebar } = useSidebar();

  const linkStyle =
    "btn btn-ghost flex items-center gap-4 px-4 w-full justify-start text-primary";

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
        <div className=" relative p-4 pt-10 flex flex-col gap-2">
          <div className=" flex justify-between items-center p-7">
            <span className="font-bold text-xl font-mono text-ghost uppercase tracking-tight">Menu</span>
           <button onClick={closeSidebar}><PanelLeftClose /></button>
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
        </div>
      </aside>
    </>
  );
}

export default SideBar;
