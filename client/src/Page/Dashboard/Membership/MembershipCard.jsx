import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MembershipCard = () => {
    const axiosSecure = useAxiosSecure();

    
    const { data: membership = [] } = useQuery({
      queryKey: ["membership"],
      queryFn: async () => {
        const res = await axiosSecure.get("/memberships");
        return res.data;
      },
    });
    console.log(membership)
    return (
        <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Upgrade to Membership
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {membership.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6  rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
                pkg.category == "Silver"
                  ? " bg-gray-300"
                  : pkg.category == "Gold"
                  ? "bg-orange-300"
                  : "bg-indigo-300"
              } `}
              onClick={() => handleCheckout(pkg.name)}
            >
              <h3 className="text-xl font-semibold mb-4 ">
                {pkg.category} Package
              </h3>
              <p className="text-lg font-medium mb-6">${pkg.price} /monthly</p>
              <Link to={`/dashboard/membershipCardUpdate/${pkg._id}`}>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Update {pkg.category}
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MembershipCard;