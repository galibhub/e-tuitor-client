import React from "react";
import { Link } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { useForm } from "react-hook-form"; // 1. Import hook
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {registerUser}=useAuth();

 
  const handleRegistration = (data) => {
    console.log("Form Data:", data);
    registerUser(data.email,data.password)
    .then(result=>{
      console.log(result.user)
    })
    .catch(error=>{
      console.log(error)
    })

    
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
            {errors.name && <span className="text-error text-sm">Name is required</span>}
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
            {errors.email?.type==='required' && <span className="text-error text-sm">Email is required</span>}
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
             {errors.password?.type==='required' && <span className="text-error text-sm">Password is required </span>}

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
            {errors.phone && <span className="text-error text-sm">Phone number is required</span>}
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
            <button type="submit" className="btn btn-primary w-full">Register</button>
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