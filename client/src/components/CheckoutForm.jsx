

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ clientSecret }) => {
  const [error, setError] = useState("");
  const { id } = useParams();
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: membership = {} } = useQuery({
    queryKey: ["membership", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/memberships/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    try {
      // Confirm the payment using the clientSecret
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName || "Unknown User",
              email: user?.email,
            },
          },
        });

      if (confirmError) {
        // console.log("Error confirming payment: ", confirmError);
        setError(confirmError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save payment details to the database
        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          price: paymentIntent.amount / 100,
          date: new Date().toISOString(),
          badge: membership.category,
          membership_id: membership._id || id,
        };

        axiosSecure
          .post("/payments", payment)
          .then((res) => {
            // console.log("Payment saved to database:", res.data);
            setError("");
            if (res.data?.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for the payment",
                timer: 1500,
              });
            }
          })
          .catch((dbError) => {
            // console.error("Error saving payment to database:", dbError);
            setError(
              "Failed to save payment to database. Please contact support."
            );
          });
      } else {
        setError("Unexpected payment intent status.");
      }
    } catch (confirmPaymentError) {
      // console.log(
      //   "Error confirming payment in catch block: ",
      //   confirmPaymentError
      // );
      setError("A processing error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="mb-4 btn mt-6 bg-blue-500"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {error && <p className="text-red-400">{error}</p>}
      {transactionId && (
        <p className="text-green-500">
          Payment successful! Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
