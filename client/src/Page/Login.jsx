import { FcGoogle } from "react-icons/fc";

import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useRef } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAxiosOpen from "../hooks/useAxiosOpen";

const Login = () => {
  const axiosOpen = useAxiosOpen()
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSignIn, handleGoogleLogin, setResetEmail, setEmail, email } =
    useContext(AuthContext);
  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSignIn(email, password)
      .then((result) => {
        toast.success("Successful Login!!");
        navigate(location.state?.from ? location.state?.from : "/");
      })
      .catch((error) => {
        if (password.length < 6) {
          toast.error("Password must be six character");
          return;
        } else {
          toast.error(error.message);
        }
      });
  };
  const handleGoogle = () => {
    handleGoogleLogin().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoUrl: result.user?.photoURL,
        role: "user",
        badge:'bronze'
      };
      axiosOpen.post("/user", userInfo)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successful SignUp",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location.state.from);
        })
        .catch((error) => navigate("/"));
    }); 
  };

  const handleForget = () => {
    setResetEmail(email);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      <Helmet>
        <title>Login || Service Review</title>
      </Helmet>
      <div className="flex justify-center mt-8">
        <div
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
        >
          <form className="card-body" onSubmit={handelLogin}>
            <h2 className="text-center font-bold text-lg">Login</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="email"
                name="email"
                onChange={handleSetEmail}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <div className="absolute md:ml-72 ml-[270px] mt-12"></div>
              <label className="label">
                <Link
                  onClick={handleForget}
                  to="/forget"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-1">
              <button className="btn bg-blue-400 text-white font-bold hover:text-purple-600">
                Login
              </button>
              <div className="flex justify-center mt-2 gap-1">
                <span>Don't have an account? </span>{" "}
                <Link
                  className="text-blue-400 font-bold hover:text-purple-500"
                  to="/resister"
                >
                  Resister
                </Link>
              </div>
              <div className="divider">OR</div>
              <Link
                onClick={handleGoogle}
                className="border py-2 flex items-center rounded-md gap-12"
              >
                <span className="ml-4 text-2xl">
                  <FcGoogle />
                </span>
                Login With Google
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
