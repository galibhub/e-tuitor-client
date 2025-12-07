import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { FaBookReader, FaUser, FaSignOutAlt, FaCog, FaChartPie } from "react-icons/fa";
import {
  FiBookOpen,
  FiPlusCircle,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiFile,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole.JSX";





const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.log(error));
  };

  // Role load howar age ekta loading screen
  if (isRoleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isStudent = role === "student";
  const isTutor = role === "tutor";
  const isAdmin = role === "admin";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar inside Dashboard */}
        <nav className="navbar bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border-b border-base-300 px-4 sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-2">
            {/* Sidebar toggle (mobile) */}
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square lg:hidden hover:bg-primary/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            {/* Logo + Name */}
            <Link to="/" className="flex items-center gap-2 group">
              <FaBookReader className="text-primary text-2xl group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                eTuitionBd
              </span>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dashboard
              </span>
              <span className="text-[11px] text-base-content/60 font-medium">
                Manage your tuitions & account
              </span>
            </div>

            {/* User Profile Dropdown */}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 hover:ring-secondary transition-all">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="bg-primary text-white flex items-center justify-center w-full h-full">
                        <FaUser className="text-xl" />
                      </div>
                    )}
                  </div>
                </label>

                {/* Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-lg bg-base-100 rounded-box w-64 border border-base-200"
                >
                  {/* User Header Section */}
                  <li className="menu-title px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-base-content">
                        {user?.displayName || "User"}
                      </span>
                      <span className="text-xs font-normal text-base-content/60 break-words">
                        {user?.email}
                      </span>
                      <span className="text-[11px] text-primary font-semibold capitalize">
                        Role: {role}
                      </span>
                    </div>
                  </li>

                  <div className="divider my-0"></div>

                  {/* Navigation Links */}
                  <li>
                    <Link to="/" className="py-3 font-medium text-base-content/80">
                      <FaChartPie className="text-lg" />
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/profile"
                      className="py-3 font-medium text-base-content/80"
                    >
                      <FaCog className="text-lg" />
                      Profile Settings
                    </Link>
                  </li>

                  <div className="divider my-0"></div>

                  {/* Logout Button */}
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="py-3 font-medium text-error hover:bg-error/10 hover:text-error focus:text-error"
                    >
                      <FaSignOutAlt className="text-lg" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Page content here */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* ===== SIDEBAR AREA ===== */}
      <div className="drawer-side z-50">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="flex min-h-full flex-col bg-gradient-to-b from-base-100 via-base-100 to-primary/5 border-r border-base-300 shadow-2xl w-72">
          {/* Sidebar Header */}
          <div className="px-4 py-6 border-b border-base-300 bg-gradient-to-r from-primary/10 to-secondary/10">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
              Dashboard
            </p>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Control Panel
            </h2>
            <p className="text-[11px] text-base-content/60 mt-1 capitalize">
              Current role: <span className="font-semibold">{role}</span>
            </p>
          </div>

          {/* Sidebar Menu */}
          <ul className="menu w-full grow p-3 gap-1 text-sm font-medium">
            {/* 🎓 Student Section (Student + Admin) */}
            {(isStudent || isAdmin) && (
              <>
                <li className="menu-title">
                  <span className="text-primary font-bold tracking-wide">
                    Student
                  </span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-tuitions"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold"
                        : "hover:bg-primary/10"
                    }
                  >
                    <FiBookOpen className="text-lg" />
                    My Tuitions
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/post-tuition"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold"
                        : "hover:bg-primary/10"
                    }
                  >
                    <FiPlusCircle className="text-lg" />
                    Post New Tuition
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/applied-tutors"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold"
                        : "hover:bg-primary/10"
                    }
                  >
                    <FiFile className="text-lg" />
                    Applied Tutors
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payments"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold"
                        : "hover:bg-primary/10"
                    }
                  >
                    <FiDollarSign className="text-lg" />
                    Payments
                  </NavLink>
                </li>
              </>
            )}

            {/* 🧑‍🏫 Tutor Section (Tutor + Admin) */}
            {(isTutor || isAdmin) && (
              <>
                <li className="menu-title mt-3">
                  <span className="text-secondary font-bold tracking-wide">
                    Tutor
                  </span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-applications"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-secondary to-accent text-white font-semibold"
                        : "hover:bg-secondary/10"
                    }
                  >
                    <FiFile className="text-lg" />
                    My Applications
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/ongoing-tuitions"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-secondary to-accent text-white font-semibold"
                        : "hover:bg-secondary/10"
                    }
                  >
                    <FiBookOpen className="text-lg" />
                    Ongoing Tuitions
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/revenue-history"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-secondary to-accent text-white font-semibold"
                        : "hover:bg-secondary/10"
                    }
                  >
                    <FiTrendingUp className="text-lg" />
                    Revenue History
                  </NavLink>
                </li>
              </>
            )}

            {/* 🛠 Admin Section (Only Admin) */}
            {isAdmin && (
              <>
                <li className="menu-title mt-3">
                  <span className="text-accent font-bold tracking-wide">
                    Admin
                  </span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/userManagement"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-accent to-primary text-white font-semibold"
                        : "hover:bg-accent/10"
                    }
                  >
                    <FiUsers className="text-lg" />
                    User Management
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/tuitionManagement"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-accent to-primary text-white font-semibold"
                        : "hover:bg-accent/10"
                    }
                  >
                    <FiBookOpen className="text-lg" />
                    Tuition Management
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/reports"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-accent to-primary text-white font-semibold"
                        : "hover:bg-accent/10"
                    }
                  >
                    <FiTrendingUp className="text-lg" />
                    Reports & Analytics
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
            <p className="text-xs text-center font-semibold text-base-content/60">
              © {new Date().getFullYear()}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                eTuitionBd
              </span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
