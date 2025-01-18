import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Membership = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: membership = [] } = useQuery({
    queryKey: ["membership"],
    queryFn: async () => {
      const res = await axiosSecure.get("/memberships");
      return res.data;
    },
  });
  console.log(membership);
  // Handle navigation to checkout
  const handleCheckout = (packageName) => {
    navigate(`/checkout/${packageName}`);
  };

  return (
    <div className="container mx-auto py-10 mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Upgrade to Membership
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {membership.map((pkg) => (
          <div
            key={pkg._id}
            className={`p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
              pkg.category === "Silver"
                ? "bg-gray-300 text-black"
                : pkg.category === "Gold"
                ? "bg-orange-300 text-black"
                : "bg-indigo-300 text-black"
            }`}
            onClick={() => handleCheckout(pkg._id)}
          >
            <h3 className="text-xl font-semibold mb-4">
              {pkg.category} Package
            </h3>
            <p className="text-lg font-medium mb-6">${pkg.price} /monthly</p>
            {pkg._id && (
              <Link to={`/checkout/${pkg._id}`}>
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Purchase {pkg.category}
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
