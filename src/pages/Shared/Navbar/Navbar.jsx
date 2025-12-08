import { Link, NavLink } from "react-router-dom";
import {
  FaBookReader,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/tuitions">Tuitions</NavLink>
      </li>
      <li>
        <NavLink to="/tutors">Tutors</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100  shadow-md border-b border-base-300 px-4  sticky top-0 z-50">
      {/* LEFT SECTION */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h12M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <FaBookReader className="text-primary text-3xl" />
          <span className="text-xl font-bold">
            e<span className="text-primary">Tuition</span>Bd
          </span>
        </Link>
      </div>

      {/* CENTER LINKS */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            {/* Dashboard Link (Optional) */}
            <Link
              to="/dashboard"
              className="btn btn-ghost btn-sm hidden md:flex"
            >
              Dashboard
            </Link>

            {/* User Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
                  </div>
                </li>

                <div className="divider my-0"></div>

                {/* Navigation Links with Icons */}
                <li>
                  <Link
                    to="/dashboard"
                    className="py-3 font-medium text-base-content/80"
                  >
                    <FaChartPie className="text-lg" />
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="py-3 font-medium text-base-content/80"
                  >
                    <FaCog className="text-lg" />
                    Profile Settings
                  </Link>
                </li>

                <div className="divider my-0"></div>

                {/* Logout Button (Styled as a red menu item) */}
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
          </>
        ) : (
          <>
            {/* Show Login & Register when user is NOT logged in */}
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            {/* <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
