import React from "react";
import { useForm } from "react-hook-form";
import { FaBookReader } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from "sweetalert2";

const PostTuition = () => {
  const {user}=useAuth();
  const axiosSecure=useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePostTuition = async (data) => {
  try {
    const tuitionData = {
      title: data.title,
      subject: data.subject,
      classLevel: data.classLevel,
      medium: data.medium,
      salary: Number(data.salary),
      daysPerWeek: data.daysPerWeek,
      location: data.location,
      tuitionType: data.tuitionType,
      contactNumber: data.contactNumber,
      deadline: data.deadline,
      description: data.description,

      // Auto attach Student Info
      studentEmail: user?.email,
      studentName: user?.displayName,
      studentPhoto: user?.photoURL || "",

      // System fields
      status: "pending",                // For admin approval
      applicationsCount: 0,             // No tutor applied yet
      createdAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/tutions", tuitionData);

    if (res.data.insertedId) {
      console.log(res.data.insertedId)
      Swal.fire({
        title: "Success!",
        text: "Tuition posted successfully. Waiting for admin approval.",
        icon: "success",
      });

      reset();
    }

  } catch (error) {
    console.error("Error posting tuition:", error);

    Swal.fire({
      title: "Error!",
      text: "Failed to post tuition. Please try again.",
      icon: "error",
    });
  }
};


  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl p-8 bg-base-100 shadow-xl rounded-lg border border-base-300">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <FaBookReader className="text-primary text-4xl" />
          </div>
          <h2 className="text-2xl font-bold">
            Post New <span className="text-primary">Tuition</span>
          </h2>
          <p className="text-base-content/60 mt-1">
            Fill in the details to create a new tuition request
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handlePostTuition)}
          className="space-y-4"
        > 
          {/* Title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Tuition Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Class 9 Science Tutor Needed"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-error text-sm">
                Tuition title is required
              </span>
            )}
          </div>

          {/* Subject & Class/Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Subject</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Math, Physics"
                className="input input-bordered w-full"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <span className="text-error text-sm">
                  Subject is required
                </span>
              )}
            </div>

            {/* Class / Level */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Class / Level</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Class 8, HSC, IELTS"
                className="input input-bordered w-full"
                {...register("classLevel", { required: true })}
              />
              {errors.classLevel && (
                <span className="text-error text-sm">
                  Class / level is required
                </span>
              )}
            </div>
          </div>

          {/* Medium & Tuition Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Medium */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Medium</span>
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue="default"
                {...register("medium", { required: true })}
              >
                <option value="default" disabled>
                  Select medium
                </option>
                <option value="bangla">Bangla Medium</option>
                <option value="english">English Medium</option>
                <option value="english-version">English Version</option>
                <option value="other">Other</option>
              </select>
              {errors.medium && (
                <span className="text-error text-sm">
                  Medium is required
                </span>
              )}
            </div>

            {/* Tuition Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Tuition Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue="default"
                {...register("tuitionType", { required: true })}
              >
                <option value="default" disabled>
                  Select tuition type
                </option>
                <option value="home">Home Tutoring</option>
                <option value="online">Online Tutoring</option>
                <option value="coaching">Coaching / Group</option>
              </select>
              {errors.tuitionType && (
                <span className="text-error text-sm">
                  Tuition type is required
                </span>
              )}
            </div>
          </div>

          {/* Salary & Days per week */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Salary */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Expected Salary (BDT)
                </span>
              </label>
              <input
                type="number"
                placeholder="e.g. 4000"
                className="input input-bordered w-full"
                {...register("salary", { required: true, min: 1 })}
              />
              {errors.salary && (
                <span className="text-error text-sm">
                  Valid salary is required
                </span>
              )}
            </div>

            {/* Days per week */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Days per week</span>
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue="default"
                {...register("daysPerWeek", { required: true })}
              >
                <option value="default" disabled>
                  Select days
                </option>
                <option value="2">2 days/week</option>
                <option value="3">3 days/week</option>
                <option value="4">4 days/week</option>
                <option value="5">5 days/week</option>
                <option value="6">6 days/week</option>
                <option value="7">7 days/week</option>
              </select>
              {errors.daysPerWeek && (
                <span className="text-error text-sm">
                  Days per week is required
                </span>
              )}
            </div>
          </div>

          {/* Location & Contact Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Location / Area</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mirpur 10, Dhanmondi 27"
                className="input input-bordered w-full"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-error text-sm">
                  Location is required
                </span>
              )}
            </div>

            {/* Contact Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Contact Number</span>
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
                {...register("contactNumber", { required: true })}
              />
              {errors.contactNumber && (
                <span className="text-error text-sm">
                  Contact number is required
                </span>
              )}
            </div>
          </div>

          {/* Deadline */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">
                Application Deadline
              </span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("deadline", { required: true })}
            />
            {errors.deadline && (
              <span className="text-error text-sm">
                Deadline is required
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">
                Description / Requirements
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[100px]"
              placeholder="Share more details about the student, topics to cover, preferred time, etc."
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-error text-sm">
                Description is required
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button type="submit" className="btn btn-primary w-full">
              Post Tuition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
