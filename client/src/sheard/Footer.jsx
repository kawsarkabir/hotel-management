import { BsTwitter } from "react-icons/bs";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { MdEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 pb-10 pt-20 mt-8 border-t  border-gray-700">
      <div className=" md:flex md:justify-between grid-rows-1 mx-auto w-[80%]">
        <div className="text-gray-400">
          <div className="-mt-2">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <p className="flex items-center gap-2  hover:text-purple-500">
            <FaLocationPin></FaLocationPin> 1901 Thornridge Cir. Mymensingh,
            Dhaka 81063
          </p>
          <p className="flex items-center gap-2  hover:text-purple-500">
            <MdOutlinePhoneInTalk />
            (880) 1835-234-869
          </p>
          <p className="flex items-center gap-2  hover:text-purple-500">
            <MdEmail /> kausar.a.pro@gmail.com
          </p>
        </div>
        <div>
          <h2 className="font-bold text-xl text-white py-3">
            Food Category
          </h2>
          <div className="flex flex-col py-3 text-gray-400">
            <a href="#" className="hover:text-purple-400">
            Fast Food
            </a>
            <a href="#" className="hover:text-purple-400">
            Street Food
            </a>
            <a href="#" className="hover:text-purple-400">
            Desserts
            </a>
            <a href="#" className="hover:text-purple-400">
            Healthy Choices
            </a>
            <a href="#" className="hover:text-purple-400">
            Seafood
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl text-white py-3">Follow Us</h2>
          <div className="text-4xl text-gray-400 flex gap-3">
            <Link to="https://www.facebook.com/" target="-blank">
              <FaFacebook />
            </Link>
            <Link to="https://x.com/home?lang=bn" target="-blank">
              <BsTwitter />
            </Link>
            <Link
              to="https://www.youtube.com/@ProgrammingHeroCommunity"
              target="-blank"
            >
              {" "}
              <FaYoutube></FaYoutube>
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-[80%] mx-auto mt-8" />
      <p className="text-center text-gray-400 mt-6">
        Copyright © {new Date().getFullYear()} Hostel WP. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
