import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"; 
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import Swal from "sweetalert2";

const ProfileSetting = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed to load profile",
          text: "Please try again later.",
        });
      });
  }, [user?.email, axiosSecure]);

  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.email) return;

    const form = e.target;
    const updatedUser = {
      name: form.name.value,
      phone: form.phone.value,
      photoURL: form.photoURL.value,
    };

    try {
      setSaving(true);
      const res = await axiosSecure.patch(`/users/${user.email}`, updatedUser);

      if (res.data.modifiedCount > 0) {
        
        setProfile((prev) => ({
          ...prev,
          ...updatedUser,
        }));

        Swal.fire({
          icon: "success",
          title: "Profile updated!",
          text: "Your profile information has been saved.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes",
          text: "You did not change anything.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

 
  if (loading || !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-sm text-base-content/60">
            Update your basic information. This profile is used across the platform.
          </p>
        </div>

        
        <div className="flex flex-col items-end text-right">
          <span className="text-xs font-semibold uppercase text-base-content/60">
            Role
          </span>
          <span className="badge badge-primary badge-outline mb-1">
            {profile.role || "student"}
          </span>
          <span className="text-xs text-base-content/60">
            Status:{" "}
            <span
              className={
                profile.status === "active" ? "text-success font-semibold" : ""
              }
            >
              {profile.status}
            </span>
          </span>
        </div>
      </div>

      {/* Main card */}
      <div className="grid md:grid-cols-[260px,1fr] gap-6">
        {/* Left: Avatar preview */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm flex flex-col items-center">
          <div className="avatar mb-3">
            <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 overflow-hidden bg-base-200 flex items-center justify-center">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt={profile.name} />
              ) : (
                <span className="text-4xl font-bold">
                  {profile.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>
          </div>
          <h3 className="font-semibold text-lg">{profile.name}</h3>
          <p className="text-xs text-base-content/70 break-all">
            {profile.email}
          </p>
          <p className="mt-2 text-[11px] text-base-content/60 text-center">
            This photo and name will be shown to other users like students and tutors.
          </p>
        </div>

        {/* Right: Form */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={profile.name || ""}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email (read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
              />
              <span className="text-[11px] text-base-content/60 mt-1">
                Email cannot be changed.
              </span>
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={profile.phone || ""}
                className="input input-bordered w-full"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                defaultValue={profile.photoURL || ""}
                className="input input-bordered w-full"
                placeholder="Paste your profile photo URL"
              />
              <span className="text-[11px] text-base-content/60 mt-1">
                You can upload your photo somewhere (e.g., imgbb) and paste the link here.
              </span>
            </div>

            {/* Created at */}
            <div className="text-[11px] text-base-content/60 mt-2">
              Joined on:{" "}
              {profile.createdAt &&
                new Date(profile.createdAt).toLocaleDateString()}
            </div>

            {/* Submit button */}
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;