import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaBookReader,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import PlatformWorks from "./PlatFormWorks";
import WhyChoose from "./WhyChoose";
import Hero from "./Hero";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedTuitions = [], isLoading } = useQuery({
    queryKey: ["approvedTuitions", "home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutions?status=approved");
      return res.data;
    },
  });

  const { data: latestTutors = [], isLoading: tutorsLoading } = useQuery({
    queryKey: ["latestTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/latest?limit=6");
      return res.data;
    },
  });

  const tuitions = approvedTuitions.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero></Hero>

      {/* Latest Tuitions */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Latest <span className="text-primary">Tuitions</span>
          </h2>
          <Link to="/tuitions" className="link link-primary">
            View All →
          </Link>
        </div>

        {tuitions.length === 0 ? (
          <div className="text-center py-12">
            <FaBookReader className="text-6xl text-base-content/30 mx-auto mb-4" />
            <p className="text-xl text-base-content/60">
              No tuitions available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((tuition) => (
              <div
                key={tuition._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow border border-base-300"
              >
                <div className="card-body">
                  <h3 className="card-title text-xl mb-2">{tuition.title}</h3>

                  <div className="flex gap-2 mb-3">
                    <span className="badge badge-primary">
                      {tuition.subject}
                    </span>
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
                      <FaMoneyBillWave className="text-success" />৳
                      {tuition.salary}/month
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
                            tuition.studentPhoto ||
                            "https://via.placeholder.com/40"
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
        )}
      </section>

      {/* Latest Tutors */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Latest <span className="text-primary">Tutors</span>
          </h2>
          <Link to="/tutors" className="link link-primary">
            View All →
          </Link>
        </div>

        {tutorsLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : latestTutors.length === 0 ? (
          <p className="text-center text-base-content/60">
            No tutors registered yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {latestTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="rounded-2xl overflow-hidden shadow-xl bg-base-100 border border-base-300 
                 hover:shadow-2xl hover:border-primary/60 transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden bg-base-200 flex items-center justify-center">
                  <img
                    src={
                      tutor.photoURL && tutor.photoURL !== ""
                        ? tutor.photoURL
                        : "https://i.ibb.co/WchFhLg/user.png"
                    }
                    alt={tutor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 p-5"
                  />

                  {/* Top-right role badge */}
                  <span className="absolute top-3 right-3 badge badge-primary text-xs shadow-md">
                    Tutor
                  </span>
                </div>
                {/* Text Content */}
                <div className="p-5 space-y-3">
                  {/* Name */}
                  <h3
                    className="text-xl font-bold text-base-content tracking-wide 
                       group-hover:text-primary transition-colors duration-300"
                  >
                    {tutor.name}
                  </h3>

                  {/* Email */}
                  <p className="text-sm text-base-content/60 flex items-center gap-2 truncate">
                    ✉️ {tutor.email}
                  </p>

                  {/* Phone */}
                  <p className="text-sm text-base-content/60 flex items-center gap-2">
                    📞 {tutor.phone || "Not provided"}
                  </p>

                  {/* Join Date */}
                  <p className="text-sm text-base-content/60 flex items-center gap-2">
                    📅 Joined:{" "}
                    {tutor.createdAt
                      ? new Date(tutor.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-base-300 text-sm">
                    <span className="font-semibold capitalize">
                      Status:
                      <span
                        className={`ml-1 ${
                          tutor.status === "active"
                            ? "text-success"
                            : "text-base-content/50"
                        }`}
                      >
                        {tutor.status}
                      </span>
                    </span>

                    <span className="text-xs italic text-base-content/50">
                      ID: {tutor.uid?.slice(0, 6)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <PlatformWorks></PlatformWorks>
      <WhyChoose></WhyChoose>
    </div>
  );
};

export default Home;
