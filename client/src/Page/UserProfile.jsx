  
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import Profile from '../assets/profile.png'

const UserProfile = () => {
  const { user } =  useContext(AuthContext)
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="w-[80%] mx-auto backdrop-blur-xl">
        <Helmet>
          <title>My Profile || Hostel Management</title>
        </Helmet>

        <img
          className="w-full object-cover bg-gray-400 md:h-[300px] h-[200px] rounded-2xl "
          src={Profile}
          alt=""
        />
      </div>

      <div className="flex justify-center w-[80%] mx-auto  md:-mt-40 -mt-28 ">
        <img
          className="md:w-[200px] object-cover md:h-[200px] w-[100px] h-[100px] rounded-full z-10 transition-shadow duration-300
      transform hover:scale-105 hover:translate-y-[-8px] border-8 shadow-lg border-white"
          src={user?.photoURL}
          alt="Album"
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
        />
      </div>

      <div
        className="card bg-base-100 md:w-[500px] w-[300px] shadow-xl border text-center mx-auto -mt-12  md:-mt-28"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-easing="ease-in-sine"
        data-aos-duration="600"
      >
        <div className="card-body">
          <p className="text-left z-20 w-[40%] "></p>
          <h3 className=" md:text-3xl mt-4 md:mt-20 font-bold">Welcome</h3>
          <h2 className="font-semibold text-2xl md:text-3xl">
            {user?.displayName}
          </h2>
          <p className="font-medium md:mt-3">Email: {user?.email}</p>
          <div className="text-center md:mt-4">
            <button className="md:border py-2 md:px-6  rounded-xl">
            <div className="flex  gap-4 text-center justify-center items-center">
            <p>Date : </p>
            <DatePicker readOnly selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
