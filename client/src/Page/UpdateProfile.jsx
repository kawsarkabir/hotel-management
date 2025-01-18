import { useContext } from "react";
 
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Provider/AuthProvider";
 

const UpdateProfile = () => {
  const Navigate = useNavigate()
   const {manageProfile} = useContext(AuthContext)
    const handleUpDate = (e)=>{
      e.preventDefault()
      const name = e.target.name.value;
      const photo = e.target.photo.value
      manageProfile(name,photo)
     Navigate("/profile")
    }
    return (
      <div>
         <Helmet>
        <title>Update profile || Service Review</title>
        </Helmet>
          <div className="w-[80%] mx-auto">
        <div className='flex justify-center mt-8'>
           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">   
      <form onSubmit={handleUpDate} className="card-body">
      <h2 className='text-center font-bold text-lg'>Update Profile</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text"  placeholder="User Name" name='name' className="input input-bordered" required />
        </div>
        <div className="form-control">
   <label className="label">
     <span className="label-text">Photo</span>
   </label>
   <input type="text" placeholder="photo url" name='photo' className="input input-bordered  w-[100%]" required />
 </div>
        <div className="form-control mt-1">
         <button  className="btn bg-blue-400 text-white font-bold hover:text-purple-600">Update Profile</button>
          
        </div>
      </form>
    </div>

        </div>
        </div>
      </div>
    );
};

export default UpdateProfile;








 
 