import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import resisterLottieData from "../assets/lottie/resister.json";
import useAxiosOpen from "../hooks/useAxiosOpen";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosOpen = useAxiosOpen();
  const { handleResister, manageProfile, handleGoogleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data?.success) {
        return data?.data?.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const { Username, email, password } = data;

    if (!photoFile) {
      setError("photoFile", {
        type: "manual",
        message: "Please upload a photo!",
      });
      return;
    }

    let imageUrl = await uploadImage(photoFile);

    handleResister(email, password)
      .then((result) => {
        if (imageUrl) {
          manageProfile(Username, imageUrl);
        } else {
          manageProfile(Username, null);
        }
        // create user db
        const userInfo = {
          name: data.Username,
          email: data.email,
          photoUrl: imageUrl,
          role: 'user',
          badge:'bronze'
        };
        axiosOpen.post("/user", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successful SignUp",
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/");
          }
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogle = () => {
    handleGoogleLogin().then((result) => {
        const userInfo ={
          email: result.user?.email,
          name: result.user?.displayName,
          photoUrl: result.user?.photoURL,
          role:'user',
          badge:'bronze'
          
        }
        axiosOpen.post("/user", userInfo)
        .then(res => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successful SignUp",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/");
        })
       
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      clearErrors("photoFile");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Resister || Service Review</title>
      </Helmet>
      <div className="p-4 sm:p-6 mx-auto lg:px-16">
        <div className="md:w-[45%] mx-auto">
          <Card shadow={true} className="p-5 sm:p-7 lg:p-8 flex">
            <div className="md:flex">
              <div className="md:w-[400px]">
                <Lottie animationData={resisterLottieData}></Lottie>
              </div>
              <div>
                <Typography
                  className="text-center underline hover:text-purple-300 text-lg sm:text-xl lg:text-2xl"
                  variant="h4"
                  color="blue-gray"
                >
                  Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 mt-4 text-sm">
                    <Controller
                      name="Username"
                      rules={{
                        required: "Username is Required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters required",
                        },
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Username"
                          error={Boolean(errors?.Username?.message)}
                          className={errors?.Username ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors?.Username?.message && (
                      <span className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">
                        {errors?.Username?.message}
                      </span>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 mt-4">
                      <Controller
                        name="email"
                        rules={{
                          required: "Email is Required",
                          pattern: {
                            value:
                              /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                            message: "Enter a valid email address",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Email ID"
                            error={Boolean(errors?.email?.message)}
                            className={errors?.email ? "border-red-500" : ""}
                          />
                        )}
                      />
                      {errors?.email?.message && (
                        <span className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">
                          {errors?.email?.message}
                        </span>
                      )}

                      <Controller
                        name="password"
                        rules={{
                          required: "Password is Required",
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                            message: "Password not strong enough",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            label="Password"
                            error={Boolean(errors?.password?.message)}
                            className={errors?.password ? "border-red-500" : ""}
                          />
                        )}
                      />
                      {errors?.password?.message && (
                        <span className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">
                          {errors?.password?.message}
                        </span>
                      )}

                      {/* Photo file upload */}
                      <div className="flex border p-2 justify-between rounded-md border-gray-400 items-center">
                        <label htmlFor="photoFile" className="cursor-pointer">
                          <div className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200">
                            <span>Upload Photo</span>
                          </div>
                        </label>
                        <input
                          id="photoFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        {photoFile && (
                          <div>
                            <img
                              src={URL.createObjectURL(photoFile)}
                              alt="Uploaded Preview"
                              className="w-20 h-10 object-cover rounded-md"
                            />
                          </div>
                        )}
                        {errors?.photoFile?.message && (
                          <span className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">
                            {errors?.photoFile?.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <label className="cursor-pointer flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        name="terms"
                        className="checkbox checkbox-success"
                        required
                      />
                      <span className="text-sm sm:text-base lg:text-lg">
                        Accept Our Terms And Condition
                      </span>
                    </label>
                    <div className="flex justify-center w-full">
                      <Button
                        type="submit"
                        className="w-full bg-blue-500 mt-3 text-sm sm:text-base lg:text-lg"
                      >
                        Sign Up
                      </Button>
                    </div>
                    <div className="flex justify-center mt-2 gap-1 text-sm sm:text-base lg:text-lg">
                      <span>Already have an account?</span>
                      <Link
                        className="text-blue-400 font-bold hover:text-purple-500"
                        to="/login"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="divider">OR</div>
                    <Link
                      onClick={handleGoogle}
                      className="border py-2 flex items-center justify-center rounded-md gap-4"
                    >
                      <FcGoogle className="text-2xl" />
                      <span className="text-sm sm:text-base lg:text-lg">
                        Login With Google
                      </span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
