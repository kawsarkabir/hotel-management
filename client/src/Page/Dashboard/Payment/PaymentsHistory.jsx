import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: paymentHistory = [], refetch } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2>Your Payment History</h2>
      {/* <ul>
          {paymentHistory.map((payment, index) => (
            <li key={index}>
              <p>Amount: ${payment.price}</p>
              <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
              <p>Status: {payment.badge}</p>
            </li>
          ))}
        </ul> */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Amount</th>
              <th>transactionId</th>
              <th>Date</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {paymentHistory.map((history) => (
              <tr>
                <td>
                  <div className="font-bold">
                    <p>${history.price}</p>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {history.transactionId}
                  </span>
                </td>
                <td><p>{new Date(history.date).toLocaleDateString()}</p></td>
                <th>
                  <button className="btn btn-ghost btn-xs"> {history.badge}</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsHistory;
