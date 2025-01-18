import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AiFillLike } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

const AllReview = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });
  console.log(reviews);

  //   specific review delete
  const handleReviewDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("meals deleted", id);
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>

                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {reviews.map((review, i) => (
                <tr key={review._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={review.user.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{review.title}</div>
                        <div className="text-sm opacity-50 flex gap-2 items-center">
                          {review.review} <AiFillLike /> {review?.like?.like_count}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex gap-3 ">
                      <span className=" text-2xl bg-blue-400 p-3 btn hover:text-black text-white rounded-xl">
                        <IoEye />
                      </span>

                      <span
                        onClick={() => handleReviewDelete(review._id)}
                        className=" text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"
                      >
                        <RiDeleteBack2Fill />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllReview;
