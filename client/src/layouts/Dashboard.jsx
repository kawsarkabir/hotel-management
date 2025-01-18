import React from "react";
import {
  FaCalendarAlt,
  FaCcAmazonPay,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import {
  MdFastfood,
  MdHome,
  MdManageAccounts,
  MdNoMeals,
  MdOutlineCardMembership,
  MdOutlineRateReview,
  MdRateReview,
  MdRestaurantMenu,
} from "react-icons/md";
import { RiMapPinAddFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (isAdmin) {
    console.log("User is an admin");
  } else {
    console.log("User is not an admin");
  }
 
  return (
    <div className="flex mx-auto md:w-[70%]">
      {/*  dashboard side bar*/}
      <div className=" w-64 min-h-screen bg-blue-300">
        <ul className="menu px-4">
          {isAdmin ? (
            <div className="my-12">
              <li>
                <NavLink to="/dashboard/adminProfile" className="mb-2">
                  <GrUserAdmin /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers" className="mb-2">
                  <MdManageAccounts /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addMeal" className="mb-2">
                  <RiMapPinAddFill /> Add Meal
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allMeals" className="mb-2">
                  <MdFastfood /> All Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allReview" className="mb-2">
                  <MdRateReview /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/serveMeals" className="mb-2">
                  <MdRestaurantMenu /> Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcomingMeals" className="mb-2">
                  <FaCalendarAlt />
                  Upcoming Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addMembership" className="mb-2">
                <MdOutlineCardMembership />
                  Add Membership
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/membershipCard" className="mb-2">
                  <FaCalendarAlt />
                  Membership Card
                </NavLink>
              </li>
              
              <div className="divider"></div>
            </div>
          ) : (
            <div className="my-12 text-md">
              <li>
                <NavLink to="/dashboard/adminProfile" className="mb-2">
                  <GrUserAdmin />My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedMeals" className="mb-2">
                  <MdNoMeals /> Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userAllReview" className="mb-2">
                  <MdOutlineRateReview /> My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentsHistory" className="mb-2">
                  <FaCcAmazonPay />
                  Payment History
                </NavLink>
              </li>
              <div className="divider"></div>
            </div>
          )}
          {/* sheared component */}

          <li className="-mt-12">
            <NavLink to="/">
              <MdHome></MdHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaSearch></FaSearch> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaEnvelope></FaEnvelope>Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/*  dashboard content*/}
      <div className="w-full mt-16 ml-12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
