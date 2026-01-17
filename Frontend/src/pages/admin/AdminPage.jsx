import { Link } from "react-router-dom";
import { 
  FaUserShield, FaUsers, FaQuestionCircle, FaBook, 
  FaLayerGroup, FaFileAlt, FaPlusCircle, FaUserPlus 
} from "react-icons/fa";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";

const AdminPage = ({ isOpen, setIsOpen }) => {
  const adminActions = [
    { title: "Add Question", to: "/admin/addquestion", icon: <FaQuestionCircle />, color: "btn-info" },
    { title: "Add Chapters", to: "/admin/addchapters", icon: <FaLayerGroup />, color: "btn-success" },
    { title: "Add Exam Type", to: "/admin/addexamtype", icon: <FaFileAlt />, color: "btn-warning" },
    { title: "Add Subjects", to: "/admin/addsubjects", icon: <FaBook />, color: "btn-primary" },
    { title: "Promote User", to: "/admin/promoteuser", icon: <FaUserPlus />, color: "btn-secondary" },
    { title: "Add Set", to: "/admin/addset", icon: <FaPlusCircle />, color: "btn-accent" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <NavBar />
      
      {/* Sidebar - Ensure your SideBar component handles mobile overlay/toggle */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          pt-20 pb-10 px-4 sm:px-6 lg:px-10
          /* Responsive Margins: On mobile (small screens), margin is minimal. 
             On lg screens, it adjusts based on isOpen state */
          ${isOpen ? "lg:ml-64" : "lg:ml-20"} 
          ml-0 
        `}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">Admin Dashboard</h1>
            <p className="text-sm opacity-60">System Overview & Management</p>
          </div>

          {/* Stats Section: 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-base-100 border border-base-300 mb-10">
            <div className="stat place-items-center lg:place-items-start">
              <div className="stat-figure text-primary text-2xl hidden md:block"><FaUsers /></div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary text-2xl md:text-3xl">1,200</div>
              <div className="stat-desc">↗︎ 40 (2%)</div>
            </div>
            
            <div className="stat place-items-center lg:place-items-start border-t lg:border-t-0 lg:border-l">
              <div className="stat-figure text-secondary text-2xl hidden md:block"><FaQuestionCircle /></div>
              <div className="stat-title">Questions</div>
              <div className="stat-value text-secondary text-2xl md:text-3xl">4,500</div>
              <div className="stat-desc">21 new today</div>
            </div>

            <div className="stat place-items-center lg:place-items-start border-t lg:border-t-0 lg:border-l">
              <div className="stat-figure text-accent text-2xl hidden md:block"><FaPlusCircle /></div>
              <div className="stat-title">Active Now</div>
              <div className="stat-value text-accent text-2xl md:text-3xl">312</div>
              <div className="stat-desc">Live sessions</div>
            </div>

            <div className="stat place-items-center lg:place-items-start border-t lg:border-t-0 lg:border-l">
              <div className="stat-figure text-info text-2xl hidden md:block"><FaUserShield /></div>
              <div className="stat-title">Admins</div>
              <div className="stat-value text-info text-2xl md:text-3xl">12</div>
              <div className="stat-desc">Authorized staff</div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <h2 className="text-lg font-bold mb-4 px-1">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminActions.map((action, index) => (
              <Link 
                to={action.to} 
                key={index}
                className="group card card-compact sm:card-normal bg-base-100 shadow-md active:scale-95 lg:hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-200 border border-base-300"
              >
                <div className="card-body flex-row items-center gap-4">
                  <div className={`text-xl p-3 rounded-lg bg-opacity-10 ${action.color.replace('btn-', 'bg-')} ${action.color.replace('btn-', 'text-')}`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;