import { Link } from "react-router-dom";
import {
  Megaphone,
  Users,
  CreditCard,
  CircleUserRound,
  GraduationCap,
  Menu
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/userContext";

const navLinks = [
  { name: "COURSES", path: "/courses", icon: GraduationCap, hideOnMobile: true },
  { name: "NOTICE", path: "/notice", icon: Megaphone, hideOnMobile: true },
  { name: "CONTACT US", path: "/contactus", icon: Users, hideOnMobile: true },
  { name: "SUBSCRIPTION", path: "/subscription/examtype", icon: CreditCard, hideOnMobile: false }
];

function NavBar() {
  const { toggleSidebar } = useSidebar();
  const { user, loading, logout } = useUser();

  if (loading) return null; // prevent flicker

  return (
    <header className="bg-base-300 border-b border-base-content/20 sticky top-0 z-20">
      <div className="p-3 mx-auto w-full">
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded hover:bg-white/10 text-primary"
            >
              <Menu size={24} />
            </button>

            <a href="/" className="text-xl font-bold text-primary font-mono tracking-tighter md:text-3xl cursor-pointer">
              EntrixNP
           </a> 
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${link.hideOnMobile ? "hidden lg:flex" : "flex"} items-center gap-2 btn btn-primary`}
              >
                <span className={`${link.hideOnMobile ? "" : "hidden md:block"}`}>{link.name}</span>
                <link.icon className={`size-5`} />
              </Link>
            ))}

            {/* USER SECTION */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-primary btn-circle text-lg font-bold"
                >
                  {user.username?.charAt(0).toUpperCase()}
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box w-44 border border-secondary"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 md:btn btn-primary"
              >
                <span className="hidden md:block md:text-base-100">
                  ACCOUNT
                </span>
                <CircleUserRound className="size-8 text-primary md:size-5 md:text-base-100" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
