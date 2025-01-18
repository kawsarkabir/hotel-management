import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import nameLogo from "../assets/l.png";
import { IoMdNotifications } from "react-icons/io";
const Navbar = () => {
  const navigate = useNavigate();
  const { handleSignOut, user, theme, setTheme } = useContext(AuthContext);
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme, setTheme]);
  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSign = () => {
    handleSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };
  const link = (
    <div className=" flex-col md:flex md:gap-3 w-full">
      <div className=" md:flex md:gap-3 *:block w-full">
        <NavLink
          className={({ isActive }) =>
            ` ${isActive ? "text-purple-500 underline " : "text-md"}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "text-purple-500 underline" : ""}`
          }
          to="/meals"
        >
          Meals
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "text-purple-500 underline " : "text-md"}`
          }
          to="/upcomingMeals"
        >
          Upcoming Meals
        </NavLink>
      </div>
    </div>
  );
  return (
    <div className="py-4 sticky top-0 z-20 bg-white/30  backdrop-blur-xl">
      <div className="navbar   flex mx-auto md:w-[90%] lg:w-[70%]  text-black font-semibold ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className=" lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className=" dropdown-content min-w-[200px] bg-base-100 rounded-box z-[1] mt-3 p-4 shadow"
          >
            <div className="">
              <li>{link}</li>
            </div>
          </ul>
        </div>
        <div className="flex-1">
          <img className="w-52" src={nameLogo} alt="" />
        </div>
        <div className="flex-none">
          <div className="hidden lg:flex mr-4">{link}</div>
          <IoMdNotifications className="text-2xl" />

          <button className="mx-3" onClick={toggleTheme}>
            {currentTheme === "light" ? (
              <FaMoon className="text-2xl hover:shadow-2xl z-50 text-yellow-300 "></FaMoon>
            ) : (
              <FaSun className="text-2xl text-white"></FaSun>
            )}
          </button>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="flex-col flex rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="rounded-full object-cover size-16"
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                  />
                  <p className="mt-1  "> {user?.displayName}</p>
                  <p className="mt-1 mb-1  "> {user?.email}</p>
                 
                </div>
                <div className="divider my-0"></div>
                <div className=" flex flex-col justify-start">
                  
                  <Link to="dashboard" className="hover:text-purple-500 hover:bg-gray-400 p-1 px-3 transition-colors duration-300 rounded-md">Dashboard</Link>
                  <Link to="/updateProfile" className="hover:text-purple-500 hover:bg-gray-400 p-1 px-3 transition-colors duration-300 rounded-md">
                    Update Profile
                  </Link>
                </div>
                <Link
                  className="mt-2 text-center bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 text-white px-5 py-2 rounded-full shadow-md 
                hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleSign}
                >
                  Sign Out
                </Link>
              </ul>
            </div>
          ) : (
            <Link
              className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300
               ease-in-out transform hover:scale-105"
              to="/login"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
