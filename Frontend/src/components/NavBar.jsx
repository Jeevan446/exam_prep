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

function NavBar() {
  const { toggleSidebar } = useSidebar();
  const { user, loading, logout } = useUser();

  // Prevent flicker while loading user
  if (loading) return null;

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

            <h1 className="text-xl font-bold text-primary font-mono tracking-tighter md:text-3xl">
              EntrixNP
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            <Link
              to="/courses"
              className="hidden lg:flex items-center gap-2 btn btn-primary"
            >
              <span>COURSES</span>
              <GraduationCap className="size-5" />
            </Link>

            <Link
              to="/notice"
              className="hidden lg:flex items-center gap-2 btn btn-primary"
            >
              <span>NOTICE</span>
              <Megaphone className="size-5" />
            </Link>

            <Link
              to="/about"
              className="hidden lg:flex items-center gap-2 btn btn-primary"
            >
              <span>ABOUT US</span>
              <Users className="size-5" />
            </Link>

            <Link
              to="/subscription"
              className="flex items-center gap-2 md:btn text-primary md:btn-primary"
            >
              <span className="hidden md:block ">
                SUBSCRIPTION
              </span>
              <CreditCard className="size-8 md:size-5" />
            </Link>

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
