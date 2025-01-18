import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddMembershipCard = () => {
  const axiosSecure = useAxiosSecure();
  const handleMembership = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const price = parseInt(e.target.price.value);
    const membershipInfo = {
      category,
      price,
    };
    console.log(membershipInfo);
    axiosSecure.post("/membership", membershipInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
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
                name="category" // Corrected placement of name attribute
                className="select select-bordered"
                required
                defaultValue="select category"
              >
                <option disabled value="select category">
                  Select Category
                </option>
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

export default AddMembershipCard;
