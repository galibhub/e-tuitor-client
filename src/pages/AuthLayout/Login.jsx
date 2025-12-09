import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("Login Data:", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Logged in user:", result.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${result.user.displayName || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong. Please try again.",
        });
      });
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
          <p className="text-base-content/60 mt-1">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <span className="text-error text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-error text-sm">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>

        {/* Extra Links */}
        <div className="mt-4 text-center text-sm">
          <p className="mb-1">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
