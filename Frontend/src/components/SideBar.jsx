import { Link } from "react-router-dom";
import { Menu, PanelLeftClose, House, BookOpen, Megaphone, UsersRound } from "lucide-react";

function SideBar({ isOpen, setIsOpen }) {
  const linkStyle = `btn btn-ghost flex items-center justify-start gap-4 px-4 w-full border-none font-medium 
    hover:bg-primary/10 hover:text-primary transition-all duration-300 group overflow-hidden`;

  return (
    <aside 
      className={`bg-base-200 border-r border-base-content/10 fixed top-16 left-0 z-10 transition-all duration-300 ease-in-out
        ${isOpen ? "w-48 md:w-64" : "w-20"} 
        h-[calc(100vh-64px)]`}
    >
      {/* Header Section - Simplified layout to prevent hit-box shifting */}
      <div className="relative flex items-center h-20 px-4">
        <h2 className={`text-base-content/50 font-black tracking-widest text-xs transition-all duration-300 
          ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
          DASHBOARD
        </h2>
        
        {/* FORCED LARGE HITBOX: btn-md + w-12 h-12 + absolute/right logic */}
        <button
          className={`btn btn-ghost btn-circle btn-md text-primary absolute transition-all duration-300
            ${isOpen ? "right-4" : "left-1/2 -translate-x-1/2"} 
            w-14 h-14 min-h-0`} // Forced large dimensions
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <PanelLeftClose size={20} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 px-3">
        <Link to="/" className={linkStyle}>
          <House size={22} className="shrink-0 text-primary group-hover:scale-110 transition-transform" />
          <span className={`whitespace-nowrap transition-all duration-300 ease-in-out 
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
            Home
          </span>
        </Link>

        <Link to="/courses" className={linkStyle}>
          <BookOpen size={22} className="shrink-0 text-primary group-hover:scale-110 transition-transform" />
          <span className={`whitespace-nowrap transition-all duration-300 ease-in-out 
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
            Courses
          </span>
        </Link>

        <Link to="/notice" className={linkStyle}>
          <Megaphone size={22} className="shrink-0 text-primary group-hover:scale-110 transition-transform" />
          <span className={`whitespace-nowrap transition-all duration-300 ease-in-out 
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
            Notice
          </span>
        </Link>

        <Link to="/about" className={linkStyle}>
          <UsersRound size={22} className="shrink-0 text-primary group-hover:scale-110 transition-transform" />
          <span className={`whitespace-nowrap transition-all duration-300 ease-in-out 
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
            About Us
          </span>
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;