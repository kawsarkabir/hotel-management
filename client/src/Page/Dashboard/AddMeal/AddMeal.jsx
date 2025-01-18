import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// Wrapper for DatePicker with forwardRef
const ForwardedDatePicker = React.forwardRef(
  ({ value, onChange, ...rest }, ref) => {
    return (
      <DatePicker
        selected={value}
        onChange={onChange}
        {...rest}
        ref={ref} // forwarding the ref
      />
    );
  }
);

const AddMeal = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset
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

  // Handle form submission
  const onSubmit = async (data) => {
    if (!photoFile) {
      setError("photoFile", {
        type: "manual",
        message: "Please upload a photo!",
      });
      return;
    }
    let imageUrl = await uploadImage(photoFile);
    const AddMealInfo = {
      name: data?.name,
      email: data?.email,
      category: data?.category,
      price: parseInt(data?.price),
      ingredients: data?.ingredients,
      title: data?.title,
      deadline: data?.deadline,
      description: data?.description,
      photoUrl: imageUrl,
      like:{
        like_count:0
      },
      review: 0,
      rating:0
    };
    console.log(AddMealInfo);
    axiosSecure.post("/meal", AddMealInfo).then(res => {
    console.log(res.data)
    if(res.data?.insertedId){
      Swal.fire({
        title:`${data.title} successful added to database`,
        icon: "success",
       timer: 1500
      });
    }
    }).catch((error) => {
      Swal.fire({
        title:`${error.message}`,
        icon: "error",
        timer: 1500
      });
    })
     
  };

  // Image change handler with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      // Validate file type
      if (!fileType.startsWith("image/")) {
        setError("photoFile", {
          type: "manual",
          message: "Please upload a valid image file!",
        });
        clearErrors("photoFile");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (fileSize > 5 * 1024 * 1024) {
        setError("photoFile", {
          type: "manual",
          message: "File size must be under 5MB!",
        });
        clearErrors("photoFile");
        return;
      }

      // If valid, set the file and clear any previous errors
      setPhotoFile(file);
      clearErrors("photoFile");
    }
  };

  return (
    <div className="bg-blue-gray-100 box-content lg:w-[800px] p-12 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2 justify-around">
          {/* Title */}
          <label className="form-control w-full">
            <span className="label-text mb-2">Title</span>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </label>

          {/* Category */}
          <label className="form-control w-full">
            <span className="label-text mb-2">Category</span>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full"
            >
              <option defaultValue={'Select a category'}>
                Select a category
              </option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Upcoming</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </label>

          {/* Ingredients */}
          <label className="form-control w-full">
            <span className="label-text mb-2">Ingredients</span>
            <input
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.ingredients && (
              <span className="text-red-500">{errors.ingredients.message}</span>
            )}
          </label>

          {/* Price */}
          <label className="form-control w-full">
            <span className="label-text mb-2">Price</span>
            <input
              {...register("price", { required: "Price is required" })}
              type="number"
              className="input input-bordered w-full"
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </label>

          {/* Post Date (DatePicker) */}
          <label className="form-control w-full">
            <span className="label-text mb-2">Post Date</span>
            <Controller
              name="deadline"
              control={control}
              rules={{ required: "Deadline is required" }}
              render={({ field }) => (
                <ForwardedDatePicker
                  {...field}
                  className="border p-2 rounded-md w-full"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    const formattedDate = date.toLocaleDateString("en-US");
                    field.onChange(formattedDate);
                  }}
                />
              )}
            />
            {errors.deadline && (
              <span className="text-red-500">{errors.deadline.message}</span>
            )}
          </label>

          {/* Name */}
          <label className="form-control w-full">
            <span className="label-text mb-2">Name</span>
            <input
              readOnly
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </label>

          {/* Email */}
          <label className="form-control w-full ">
            <span className="label-text mb-2">Email</span>
            <input
              readOnly
              defaultValue={user?.email}
              {...register("email", { required: "Email is required" })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>

          {/* Photo file upload */}
          <div className="flex justify-left rounded-md gap-4 items-end">
            <label htmlFor="photoFile" className="cursor-pointer">
              <div className="flex items-center justify-center bg-white text-black py-3 px-4 rounded-lg shadow-md hover:bg-blue-200 transition-all duration-200">
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
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          {/* description */}
          <div className=" col-span-2">
            <label className="form-control">
              <span className="label-text mb-2">Description</span>
              <textarea
                {...register("description", {
                  required: "description is required",
                })}
                placeholder="description"
                className="textarea textarea-bordered col-span-2 "
              ></textarea>
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="justify-center px-6 bg-blue-500 text-white py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
        >
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
