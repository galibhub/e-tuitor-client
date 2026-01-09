import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaBookReader,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaArrowRight,
  FaChalkboardTeacher,
  FaStar,
} from "react-icons/fa";

import WhyChoose from "./WhyChoose";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Statistics from "./Statistics";
import Faq from "./FAQ";
import Newsletter from "./Newsletter";
import PlatformWorks from './PlatformWorks';

// --- COMPONENT: Skeleton Loader ---
const CardSkeleton = () => (
  <div className="card bg-base-100 shadow-sm border border-base-200 h-full animate-pulse">
    <div className="h-48 bg-base-300 w-full rounded-t-2xl"></div>
    <div className="p-5 space-y-4">
      <div className="h-6 bg-base-300 rounded w-3/4"></div>
      <div className="flex gap-2">
        <div className="h-5 bg-base-300 rounded w-16"></div>
        <div className="h-5 bg-base-300 rounded w-16"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-4 bg-base-300 rounded w-full"></div>
        <div className="h-4 bg-base-300 rounded w-5/6"></div>
      </div>
      <div className="h-10 bg-base-300 rounded w-full mt-2"></div>
    </div>
  </div>
);

const Home = () => {
  const axiosSecure = useAxiosSecure();

  // --- FETCH TUITIONS ---
  const { data: approvedTuitions = [], isLoading: tuitionsLoading } = useQuery({
    queryKey: ["approvedTuitions", "home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutions?status=approved");
      return res.data;
    },
  });

  // --- FETCH TUTORS ---
  const { data: latestTutors = [], isLoading: tutorsLoading } = useQuery({
    queryKey: ["latestTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/latest?limit=8");
      return res.data;
    },
  });

  const tuitions = approvedTuitions.slice(0, 8);

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Statistics Section (Visual Bridge) */}
      <div className="-mt-10 relative z-10">
        <Statistics />
      </div>

      {/* 3. LATEST TUITIONS SECTION (White Background) */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-base-200 pb-5 gap-4">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
              Opportunities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest <span className="text-primary">Tuitions</span>
            </h2>
          </div>
          <Link
            to="/tuitions"
            className="btn btn-primary btn-outline btn-sm gap-2 rounded-full px-6 hover:scale-105 transition-transform"
          >
            View All <FaArrowRight />
          </Link>
        </div>

        {tuitionsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <CardSkeleton key={n} />
            ))}
          </div>
        ) : tuitions.length === 0 ? (
          <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-dashed border-base-300">
            <div className="bg-base-100 p-6 rounded-full inline-flex mb-4 shadow-sm text-primary">
              <FaBookReader className="text-5xl opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-base-content/80">
              No tuitions posted yet
            </h3>
            <p className="text-base-content/60 mt-1">
              Be the first to post a tuition request!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tuitions.map((tuition) => (
              <div
                key={tuition._id}
                className="card bg-base-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-200 group flex flex-col h-full overflow-hidden"
              >
                {/* --- IMAGE SECTION (Fixed Height) --- */}
                <figure className="h-48 w-full bg-base-200 relative overflow-hidden">
                  <img
                    src={
                      tuition.image ||
                      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                    }
                    alt={tuition.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";
                    }}
                  />
                  {/* Overlay Gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </figure>

                {/* --- CARD BODY --- */}
                <div className="card-body p-5 flex flex-col flex-grow">
                  
                  {/* Title (Fixed Min-Height for alignment) */}
                  <h3
                    className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]"
                    title={tuition.title}
                  >
                    {tuition.title}
                  </h3>

                  {/* Badges (Horizontal Layout) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-primary badge-outline text-xs font-semibold px-2.5 py-1 h-auto">
                      {tuition.subject}
                    </span>
                    <span className="badge badge-secondary badge-outline text-xs font-semibold px-2.5 py-1 h-auto">
                      {tuition.classLevel}
                    </span>
                  </div>

                  {/* Info List (Pushes footer down) */}
                  <div className="space-y-2.5 text-sm text-base-content/70 mb-4">
                    <p className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                      <span className="truncate" title={tuition.location}>{tuition.location}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <FaMoneyBillWave className="text-success flex-shrink-0" />
                      <span className="font-bold text-base-content">
                        ৳{tuition.salary}
                      </span>
                      <span className="text-xs">/month</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <FaCalendarAlt className="text-secondary flex-shrink-0" />
                      <span>{tuition.daysPerWeek} days/week</span>
                    </p>
                  </div>

                  {/* --- FOOTER (Sticks to bottom) --- */}
                  <div className="mt-auto pt-4 border-t border-base-100 flex items-center justify-between gap-3">
                    {/* User Info */}
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="avatar placeholder shrink-0">
                        <div className="bg-neutral text-neutral-content rounded-full w-8 ring-1 ring-base-300 ring-offset-1">
                          {tuition.studentPhoto ? (
                            <img
                              src={tuition.studentPhoto}
                              alt="student"
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold">ST</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold text-base-content truncate max-w-[90px]">
                          {tuition.studentName}
                        </span>
                        <span className="text-[10px] text-base-content/50 uppercase tracking-wide">
                          Student
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/tuitions/${tuition._id}`}
                      className="btn btn-primary btn-sm px-4 shrink-0 rounded-lg"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. LATEST TUTORS SECTION */}
      <section className="bg-base-200/40 py-16 border-y border-base-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                Experts
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                Top Rated <span className="text-secondary">Tutors</span>
              </h2>
            </div>
            <Link
              to="/tutors"
              className="btn btn-secondary btn-outline btn-sm gap-2 rounded-full px-6 hover:scale-105 transition-transform"
            >
              Find Tutors <FaArrowRight />
            </Link>
          </div>

          {tutorsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <CardSkeleton key={n} />
              ))}
            </div>
          ) : latestTutors.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-4 bg-base-100 rounded-full mb-4 shadow-sm text-secondary">
                <FaChalkboardTeacher className="text-5xl opacity-50" />
              </div>
              <p className="text-lg text-base-content/60">
                No tutors registered yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latestTutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="card bg-base-100 shadow-sm hover:shadow-2xl transition-all duration-300 border border-base-200 group overflow-hidden h-full"
                >
                  <figure className="h-56 w-full relative overflow-hidden bg-base-300">
                    <img
                      src={
                        tutor.photoURL || "https://i.ibb.co/WchFhLg/user.png"
                      }
                      alt={tutor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="text-white font-medium text-sm flex items-center gap-2">
                        View Profile <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                    <span className="absolute top-3 right-3 badge badge-secondary shadow-md border-0 text-white font-bold">
                      Tutor
                    </span>
                  </figure>

                  <div className="card-body p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="card-title text-lg font-bold group-hover:text-secondary transition-colors truncate w-full">
                        {tutor.name}
                      </h3>
                      {tutor.status === "active" && (
                        <FaStar className="text-yellow-400 text-sm mt-1 shrink-0" />
                      )}
                    </div>

                    <div className="text-sm text-base-content/70 space-y-1.5 mt-2 mb-4">
                      <p className="truncate flex items-center gap-2">
                        <span className="opacity-70">✉️</span> {tutor.email}
                      </p>
                      <p className="truncate flex items-center gap-2">
                        <span className="opacity-70">📞</span>{" "}
                        {tutor.phone || "N/A"}
                      </p>
                    </div>

                    <div className="card-actions justify-between mt-auto pt-3 border-t border-base-100 items-center">
                      <div className="text-[10px] text-base-content/40 font-medium uppercase tracking-wide">
                        Joined:{" "}
                        {tutor.createdAt
                          ? new Date(tutor.createdAt).toLocaleDateString()
                          : "Recent"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Additional Sections */}
      <Testimonials />
      <Faq />
      <Newsletter />
      <PlatformWorks />
      <WhyChoose />
    </div>
  );
};

export default Home;