import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateMembershipCard = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: membershipCard = [] } = useQuery({
    queryKey: ["membershipCard", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/memberships/${id}`);
      return res.data;
    },
  });

  const handleMembership = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const price = parseInt(e.target.price.value);
    const membershipInfo = {
      category,
      price,
    };
    console.log(membershipInfo);
    axiosSecure.patch(`/memberships/${id}`, membershipInfo).then((res) => {
      if (res.data?.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "successful updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/membershipCard");
      }
    });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleMembership} className="card-body">
          <div className="form-control">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category:</span>
              </div>
              <select
                name="category"
                className="select select-bordered"
                required
              >
                <option>{membershipCard.category}</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price:</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Amount"
              defaultValue={membershipCard.price}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Add Membership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMembershipCard;
