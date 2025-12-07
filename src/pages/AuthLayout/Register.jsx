import React from "react";
import { Link } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { useForm } from "react-hook-form"; // 1. Import hook
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const Register = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, user } = useAuth();

 const handleRegistration = async (data) => {
  console.log("Form Data:", data);

  try {
    const profileImg = data.photo[0];

    
    const formData = new FormData(); 
    formData.append("image", profileImg);
    
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgage_host_key}`;
    const imgResponse = await axios.post(image_API_URL, formData); // Added await
    
    const photoURL = imgResponse.data.data.display_url; 
    console.log("Uploaded photo URL:", photoURL);

    
    const result = await registerUser(data.email, data.password);
    console.log(result.user);

    
    const newUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      photoURL: photoURL, 
      uid: result.user.uid,
      createdAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/users", newUser);
    console.log("User saved:", res.data);

    if (res.data.insertedId) {
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // window.location.href = "/dashboard";
    }
  } catch (error) {
    console.error("Registration error:", error);

    Swal.fire({
      title: "Error!",
      text: error.message || "Failed to create account. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md p-8 bg-base-100 shadow-xl rounded-lg border border-base-300">
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <FaBookReader className="text-primary text-4xl" />
          </div>
          <h2 className="text-2xl font-bold">
            e<span className="text-primary">Tuition</span>Bd
          </h2>
          <p className="text-base-content/60 mt-1">Register your account</p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {/* Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-error text-sm">Name is required</span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Photo</span>
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
              placeholder="Your Photo"
            />
            {errors.photo?.type === "required" && (
              <span className="text-error text-sm">Photo is required</span>
            )}
          </div>

          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <span className="text-error text-sm">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="input input-bordered w-full"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <span className="text-error text-sm">Password is required </span>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-error text-sm">
                Password must be 6 carecter or longer
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Phone Number</span>
            </label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              className="input input-bordered w-full"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-error text-sm">
                Phone number is required
              </span>
            )}
          </div>

          {/* Role Selection */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Register As</span>
            </label>

            <select
              className="select select-bordered w-full"
              defaultValue="default"
              {...register("role", { required: true })}
            >
              <option value="default" disabled>
                Choose a role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>

        {/* Already have account */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
