import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBookReader,
} from "react-icons/fa";

const Tutions = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch ALL approved tuitions (NO SORTING)
  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["allApprovedTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutions?status=approved");
      return res.data; // NO sorting here
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Title */}
      <h2 className="text-4xl font-bold text-center mb-10">
        All <span className="text-primary">Tuitions</span>
      </h2>

      {/* Tuition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow border border-base-300"
          >
            <div className="card-body">
              <h3 className="card-title text-xl mb-2">{tuition.title}</h3>

              <div className="flex gap-2 mb-3">
                <span className="badge badge-primary">{tuition.subject}</span>
                <span className="badge badge-secondary">
                  {tuition.classLevel}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  {tuition.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-success" />৳{tuition.salary}
                  /month
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-secondary" />
                  {tuition.daysPerWeek} days/week
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-base-300">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    <img
                      src={
                        tuition.studentPhoto || "https://via.placeholder.com/40"
                      }
                      alt={tuition.studentName}
                    />
                  </div>
                </div>
                <span className="text-sm text-base-content/70">
                  {tuition.studentName}
                </span>
              </div>

              <div className="card-actions mt-4">
                <Link
                  to={`/tuitions/${tuition._id}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tuitions.length === 0 && (
        <div className="text-center py-12">
          <FaBookReader className="text-6xl text-base-content/30 mx-auto mb-4" />
          <p className="text-xl text-base-content/60">
            No approved tuitions available
          </p>
        </div>
      )}
    </div>
  );
};

export default Tutions;
