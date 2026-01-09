import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBookReader } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PostTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false); // Add Loading State

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // --- IMAGE UPLOAD FUNCTION ---
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    // Check if Key exists
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!imgbbKey) {
        throw new Error("ImgBB API Key is missing in .env file");
    }

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed: " + (data.error?.message || "Unknown error"));
    }

    return data.data.url;
  };

  // --- MAIN SUBMIT HANDLER ---
  const handlePostTuition = async (data) => {
    setLoading(true); // Start Loader
    try {
      console.log("Starting Image Upload...");
      const imageFile = data.image[0];
      const imageURL = await uploadImageToImgBB(imageFile);
      console.log("Image Uploaded:", imageURL);

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
        image: imageURL,

        // Student Info
        studentEmail: user?.email,
        studentName: user?.displayName,
        studentPhoto: user?.photoURL || "",

        // System fields
        status: "pending",
        applicationsCount: 0,
        createdAt: new Date().toISOString(),
      };

      console.log("Sending Data to Server...", tuitionData);
      const res = await axiosSecure.post("/tutions", tuitionData);

      if (res.data.insertedId) {
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
        text: error.message || "Failed to post tuition.",
        icon: "error",
      });
    } finally {
      setLoading(false); // Stop Loader
    }
  };

  // --- DEBUGGING VALIDATION ERRORS ---
  const onFormError = (errors) => {
      console.error("Form Validation Errors:", errors);
      // Optional: Alert the user they missed a field
      Swal.fire({
          title: "Incomplete Form",
          text: "Please fill out all required fields marked in red.",
          icon: "warning"
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
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

        {/* Form - Note the second argument to handleSubmit */}
        <form onSubmit={handleSubmit(handlePostTuition, onFormError)} className="space-y-4">
          
          {/* Title */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium">Tuition Title</span></label>
            <input type="text" placeholder="e.g. Class 9 Science Tutor Needed" className="input input-bordered w-full"
              {...register("title", { required: "Title is required" })} />
            {errors.title && <span className="text-error text-sm">{errors.title.message}</span>}
          </div>

          {/* Image Upload */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium">Tuition Image</span></label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("image", {
                required: "Image is required",
                validate: {
                  fileType: (files) =>
                    ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type) || "Only JPG, PNG, WEBP allowed",
                  fileSize: (files) =>
                    files[0]?.size < 3 * 1024 * 1024 || "Image must be less than 3MB",
                },
              })}
            />
            {errors.image && <p className="text-error text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Grid: Subject & Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Subject</span></label>
              <input type="text" placeholder="e.g. Math" className="input input-bordered w-full"
                {...register("subject", { required: "Subject is required" })} />
              {errors.subject && <span className="text-error text-sm">{errors.subject.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Class / Level</span></label>
              <input type="text" placeholder="e.g. Class 8" className="input input-bordered w-full"
                {...register("classLevel", { required: "Class Level is required" })} />
              {errors.classLevel && <span className="text-error text-sm">{errors.classLevel.message}</span>}
            </div>
          </div>

          {/* Grid: Medium & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Medium</span></label>
              <select className="select select-bordered w-full" defaultValue=""
                {...register("medium", { required: "Medium is required" })}>
                <option value="" disabled>Select medium</option>
                <option value="bangla">Bangla Medium</option>
                <option value="english">English Medium</option>
                <option value="english-version">English Version</option>
                <option value="other">Other</option>
              </select>
              {errors.medium && <span className="text-error text-sm">{errors.medium.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Tuition Type</span></label>
              <select className="select select-bordered w-full" defaultValue=""
                {...register("tuitionType", { required: "Tuition Type is required" })}>
                <option value="" disabled>Select type</option>
                <option value="home">Home Tutoring</option>
                <option value="online">Online Tutoring</option>
                <option value="coaching">Coaching / Group</option>
              </select>
              {errors.tuitionType && <span className="text-error text-sm">{errors.tuitionType.message}</span>}
            </div>
          </div>

          {/* Grid: Salary & Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Salary (BDT)</span></label>
              <input type="number" placeholder="4000" className="input input-bordered w-full"
                {...register("salary", { required: "Salary is required", min: { value: 100, message: "Salary must be valid" } })} />
              {errors.salary && <span className="text-error text-sm">{errors.salary.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Days per week</span></label>
              <select className="select select-bordered w-full" defaultValue=""
                {...register("daysPerWeek", { required: "Days per week is required" })}>
                <option value="" disabled>Select days</option>
                <option value="2">2 days/week</option>
                <option value="3">3 days/week</option>
                <option value="4">4 days/week</option>
                <option value="5">5 days/week</option>
                <option value="6">6 days/week</option>
                <option value="7">7 days/week</option>
              </select>
              {errors.daysPerWeek && <span className="text-error text-sm">{errors.daysPerWeek.message}</span>}
            </div>
          </div>

          {/* Grid: Location & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Location</span></label>
              <input type="text" placeholder="Area name" className="input input-bordered w-full"
                {...register("location", { required: "Location is required" })} />
              {errors.location && <span className="text-error text-sm">{errors.location.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Contact Number</span></label>
              <input type="tel" placeholder="017..." className="input input-bordered w-full"
                {...register("contactNumber", { required: "Contact number is required" })} />
              {errors.contactNumber && <span className="text-error text-sm">{errors.contactNumber.message}</span>}
            </div>
          </div>

          {/* Deadline */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium">Deadline</span></label>
            <input type="date" className="input input-bordered w-full"
              {...register("deadline", { required: "Deadline is required" })} />
            {errors.deadline && <span className="text-error text-sm">{errors.deadline.message}</span>}
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium">Description</span></label>
            <textarea className="textarea textarea-bordered w-full min-h-[100px]" placeholder="Details..."
              {...register("description", { required: "Description is required" })}></textarea>
            {errors.description && <span className="text-error text-sm">{errors.description.message}</span>}
          </div>

          {/* Submit Button with Loading State */}
          <div className="pt-2">
            <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={loading} // Disable while loading
            >
              {loading ? <span className="loading loading-spinner"></span> : "Post Tuition"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;