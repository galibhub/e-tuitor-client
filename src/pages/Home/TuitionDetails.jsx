import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaBookOpen,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaUserGraduate,
} from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [openModal, setOpenModal] = useState(false);

  // 1️⃣ Fetch single tuition by id
  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuitionDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutions/${id}`);
      return res.data;
    },
  });

  // 2️⃣ Fetch logged-in user's ROLE from backend
  const { data: roleData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, // only call if user logged-in
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data; // { role: 'student' | 'tutor' | 'admin' }
    },
  });

  const userRole = roleData?.role; // may be 'student'|'tutor'|'admin'

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  // 3️⃣ Handle application submit
  const handleApply = async (data) => {
    // Extra safety: check login + role
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You must login as tutor to apply.",
      });
      return;
    }

    if (userRole !== "tutor") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Only tutors can apply for tuition.",
      });
      return;
    }

    const application = {
      tuitionId: tuition._id,
      tuitionTitle: tuition.title,
      studentEmail: tuition.studentEmail,
      studentName: tuition.studentName,

      tutorName: data.tutorName || user?.displayName,
      tutorEmail: data.tutorEmail || user?.email,
      tutorPhoto: user?.photoURL || "",
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: data.expectedSalary,

      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/applications", application);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "The student will review your application.",
        });

        reset();
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not submit application. Try again.",
      });
    }
  };

  if (isLoading || !tuition) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* --- 1. Top Header Card --- */}
        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="badge badge-primary badge-outline font-semibold">
                {tuition.subject}
              </span>
              <span className="badge badge-secondary badge-outline font-semibold">
                {tuition.classLevel}
              </span>
              <span className="badge badge-ghost text-xs uppercase tracking-wide">
                {tuition.tuitionType}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
              {tuition.title}
            </h1>
            <p className="text-base-content/60 flex items-center gap-2">
              <FaMapMarkerAlt className="text-error" /> {tuition.location}
            </p>
          </div>

          {/* --- APPLY BUTTON AREA (ROLE LOGIC HERE) --- */}
          <div className="w-full md:w-auto">
            {!user && (
              <div className="alert alert-warning shadow-sm py-2 text-sm flex items-center gap-2">
                <FaUserGraduate />
                <span>Login as tutor to apply.</span>
              </div>
            )}

            {user && isRoleLoading && (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm text-primary"></span>
                <span className="text-sm text-base-content/60">
                  Checking your role...
                </span>
              </div>
            )}

            {user && !isRoleLoading && userRole !== "tutor" && (
              <div className="alert alert-error shadow-sm py-2 text-sm flex items-center gap-2">
                <FaUserGraduate />
                <span>Only tutors can apply for tuition.</span>
              </div>
            )}

            {user && !isRoleLoading && userRole === "tutor" && (
              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-primary btn-lg w-full md:w-auto shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- 2. Left Column: Main Details --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Salary */}
              <div className="bg-base-100 p-5 rounded-2xl border border-base-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-green-100 text-green-600 rounded-full text-xl">
                  <FaMoneyBillWave />
                </div>
                <div>
                  <p className="text-sm text-base-content/60 font-medium">
                    Monthly Salary
                  </p>
                  <p className="text-lg font-bold text-base-content">
                    {formatCurrency(tuition.salary)}
                  </p>
                </div>
              </div>
              {/* Schedule */}
              <div className="bg-base-100 p-5 rounded-2xl border border-base-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-full text-xl">
                  <FaClock />
                </div>
                <div>
                  <p className="text-sm text-base-content/60 font-medium">
                    Schedule
                  </p>
                  <p className="text-lg font-bold text-base-content">
                    {tuition.daysPerWeek} Days / Week
                  </p>
                </div>
              </div>
              {/* Medium */}
              <div className="bg-base-100 p-5 rounded-2xl border border-base-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-purple-100 text-purple-600 rounded-full text-xl">
                  <FaBookOpen />
                </div>
                <div>
                  <p className="text-sm text-base-content/60 font-medium">
                    Medium
                  </p>
                  <p className="text-lg font-bold text-base-content capitalize">
                    {tuition.medium}
                  </p>
                </div>
              </div>
              {/* Type */}
              <div className="bg-base-100 p-5 rounded-2xl border border-base-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-orange-100 text-orange-600 rounded-full text-xl">
                  <FaChalkboardTeacher />
                </div>
                <div>
                  <p className="text-sm text-base-content/60 font-medium">
                    Type
                  </p>
                  <p className="text-lg font-bold text-base-content capitalize">
                    {tuition.tuitionType}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-8">
              <h3 className="text-xl font-bold mb-4 border-b border-base-200 pb-2">
                Description / Requirements
              </h3>
              <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                {tuition.description}
              </p>
            </div>
          </div>

          {/* --- 3. Right Column: Poster Info --- */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6 sticky top-10">
              <h3 className="text-lg font-bold mb-6">Posted By</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-16 shadow-inner ring ring-base-200 ring-offset-2">
                    {tuition.studentPhoto ? (
                      <img src={tuition.studentPhoto} alt={tuition.studentName} />
                    ) : (
                      <span className="text-xl font-bold uppercase">
                        {tuition.studentName?.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-lg leading-none truncate">
                    {tuition.studentName}
                  </p>
                  <p className="text-sm text-base-content/60 mt-1">
                    Student / Guardian
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm p-3 bg-base-200/50 rounded-lg border border-base-200">
                  <FaPhoneAlt className="text-primary" />
                  <span className="font-medium">{tuition.contactNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-3 bg-base-200/50 rounded-lg border border-base-200">
                  <FaMapMarkerAlt className="text-secondary" />
                  <span className="font-medium truncate">
                    {tuition.location}
                  </span>
                </div>
              </div>

              <div className="divider text-xs text-base-content/40 uppercase">
                Safety Tips
              </div>
              <p className="text-xs text-base-content/60 text-center leading-5">
                Always arrange a demo class before final commitment.
              </p>
            </div>
          </div>
        </div>

        {/* --- 4. Application Modal --- */}
        {openModal && (
          <dialog className="modal modal-open modal-bottom sm:modal-middle bg-black/60 backdrop-blur-sm z-50">
            <div className="modal-box w-11/12 max-w-2xl p-0 overflow-hidden rounded-2xl shadow-2xl">
              {/* Modal Header */}
              <div className="bg-primary text-primary-content p-6">
                <h3 className="font-bold text-2xl flex items-center gap-2">
                  <FaUserGraduate /> Apply for Tuition
                </h3>
                <p className="text-sm opacity-90 mt-1">
                  Applying for:{" "}
                  <span className="font-semibold underline">
                    {tuition.title}
                  </span>
                </p>
              </div>

              {/* Modal Body */}
              <form
                onSubmit={handleSubmit(handleApply)}
                className="p-6 md:p-8 bg-base-100"
              >
                {/* 1. Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                  {/* Name */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-xs font-bold uppercase text-base-content/50">
                        Your Name
                      </span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName || ""}
                      readOnly
                      {...register("tutorName")}
                      className="input input-bordered w-full bg-base-200/50 cursor-not-allowed"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-xs font-bold uppercase text-base-content/50">
                        Your Email
                      </span>
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      readOnly
                      {...register("tutorEmail")}
                      className="input input-bordered w-full bg-base-200/50 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Qualifications */}
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text font-bold text-base">
                      Your Qualifications
                    </span>
                  </label>
                  <textarea
                    {...register("qualifications", {
                      required: "Qualifications are required",
                      minLength: {
                        value: 10,
                        message: "Please write at least 10 characters",
                      },
                    })}
                    className={`textarea textarea-bordered h-24 w-full text-base ${
                      errors.qualifications
                        ? "textarea-error"
                        : "focus:textarea-primary"
                    }`}
                    placeholder="E.g. BSc in Math from DU, 3 years tutoring experience..."
                  ></textarea>

                  {errors.qualifications && (
                    <p className="text-error text-sm mt-1">
                      {errors.qualifications.message}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text font-bold text-base">
                      Relevant Experience
                    </span>
                  </label>
                  <textarea
                    {...register("experience", {
                      required: "Experience is required",
                      minLength: {
                        value: 5,
                        message: "Please write at least 5 characters",
                      },
                    })}
                    className={`textarea textarea-bordered h-24 w-full text-base ${
                      errors.experience
                        ? "textarea-error"
                        : "focus:textarea-primary"
                    }`}
                    placeholder="Briefly describe your experience teaching this specific subject."
                  ></textarea>

                  {errors.experience && (
                    <p className="text-error text-sm mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                {/* Expected Salary */}
                <div className="form-control w-full mb-6">
                  <label className="label">
                    <span className="label-text font-bold text-base">
                      Expected Monthly Salary
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 font-bold">
                      ৳
                    </span>

                    <input
                      type="number"
                      {...register("expectedSalary", {
                        required: "Expected salary is required",
                        min: {
                          value: 1,
                          message: "Salary must be greater than 0",
                        },
                      })}
                      className={`input input-bordered w-full pl-10 font-medium ${
                        errors.expectedSalary
                          ? "input-error"
                          : "focus:input-primary"
                      }`}
                      placeholder="e.g. 5000"
                    />
                  </div>

                  {errors.expectedSalary && (
                    <p className="text-error text-sm mt-1">
                      {errors.expectedSalary.message}
                    </p>
                  )}

                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Student's budget: {tuition.salary} BDT
                    </span>
                  </label>
                </div>

                {/* Modal Actions */}
                <div className="modal-action flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="btn btn-ghost hover:bg-base-200"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-8">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setOpenModal(false)}>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default TuitionDetails;
