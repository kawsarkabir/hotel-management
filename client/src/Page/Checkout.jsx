

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { LuBadgeDollarSign } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { data: checkout = [] } = useQuery({
    queryKey: ["checkout", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/memberships/${id}`);
      return res.data;
    },
  });

  const packagePrice = checkout.price;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: packagePrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Error creating payment intent:", err));
  }, [axiosSecure, packagePrice]);

  const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateway_PK);

  return (
    <div className="mx-auto flex justify-center md:w-[90%] lg:w-[70%] mt-16">
      <div className="md:w-[500px] bg-gray-200 px-10 py-12 rounded-xl">
        <div className="flex justify-between mb-12">
          <h3 className="text-xl text-black flex items-center gap-2 font-body">
            <SlBadge /> {checkout.category}
          </h3>
          <h4 className="text-xl text-black flex items-center gap-2 font-body">
            <LuBadgeDollarSign /> {checkout.price}
          </h4>
        </div>
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
