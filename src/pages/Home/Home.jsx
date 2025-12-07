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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow border border-base-300"
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={
                            tutor.photoURL || "https://via.placeholder.com/48"
                          }
                          alt={tutor.name}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{tutor.name}</h3>
                      <p className="text-xs text-base-content/60">
                        {tutor.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-base-content/70">
                    Registered tutor on eTuitionBd
                  </p>
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
