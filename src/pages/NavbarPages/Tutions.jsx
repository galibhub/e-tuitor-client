import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBookReader,
  FaSearch,
} from "react-icons/fa";

const Tutions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // UI states
  const [searchText, setSearchText] = useState("");
  const [filterClass, setFilterClass] = useState(""); // text input
  const [filterSubject, setFilterSubject] = useState(""); // text input
  const [filterLocation, setFilterLocation] = useState(""); // text input
  const [sortOption, setSortOption] = useState("date_desc"); // default: newest first
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["allApprovedTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutions?status=approved");
      return res.data;
    },
  });

  // 👉 If any filter changes, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filterClass, filterSubject, filterLocation, sortOption]);

  // ====================== FILTER + SEARCH + SORT ======================
  const processedTuitions = useMemo(() => {
    let list = [...tuitions];

    // 🔍 Main search (title + subject + location + class)
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      list = list.filter((t) => {
        const title = t.title?.toLowerCase() || "";
        const subject = t.subject?.toLowerCase() || "";
        const location = t.location?.toLowerCase() || "";
        const classLevel = t.classLevel?.toLowerCase() || "";

        return (
          title.includes(search) ||
          subject.includes(search) ||
          location.includes(search) ||
          classLevel.includes(search)
        );
      });
    }

    // 🎯 Class filter (input)
    if (filterClass.trim()) {
      const key = filterClass.toLowerCase();
      list = list.filter((t) =>
        (t.classLevel || "").toLowerCase().includes(key)
      );
    }

    // 🎯 Subject filter (input)
    if (filterSubject.trim()) {
      const key = filterSubject.toLowerCase();
      list = list.filter((t) => (t.subject || "").toLowerCase().includes(key));
    }

    // 🎯 Location filter (input)
    if (filterLocation.trim()) {
      const key = filterLocation.toLowerCase();
      list = list.filter((t) => (t.location || "").toLowerCase().includes(key));
    }

    // 🔃 Sort
    list.sort((a, b) => {
      if (sortOption === "date_desc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOption === "date_asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortOption === "salary_desc") {
        return (b.salary || 0) - (a.salary || 0);
      }
      if (sortOption === "salary_asc") {
        return (a.salary || 0) - (b.salary || 0);
      }
      return 0;
    });

    return list;
  }, [
    tuitions,
    searchText,
    filterClass,
    filterSubject,
    filterLocation,
    sortOption,
  ]);

  // ====================== PAGINATION ======================
  const totalItems = processedTuitions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedTuitions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedTuitions.slice(startIndex, startIndex + itemsPerPage);
  }, [processedTuitions, currentPage]);

  // ====================== HANDLE VIEW DETAILS (LOGIN FIRST) ======================
  const handleViewDetails = (e, id) => {
    // user na thakle -> login e pathabo
    if (!user) {
      e.preventDefault(); // normal navigation bondho
      navigate("/login");
    }
    // user thakle normal way te details e jabe (Link already ache)
  };

  // ====================== LOADING STATE ======================
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* ====================== HEADER ====================== */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
          Find Your Perfect Tuition
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          All <span className="text-primary">Tuitions</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-base-content/60 max-w-2xl mx-auto">
          Browse all approved tuition posts. Use search, filters and sorting to
          find the best match for you.
        </p>
      </div>

      {/* ====================== SEARCH + FILTER + SORT BAR ====================== */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-4 md:p-5 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr,1.5fr] gap-3 md:gap-4 items-center">
          {/* 🔍 Main Search */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold uppercase text-base-content/60">
                Search (all fields)
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
                <FaSearch className="text-sm" />
              </span>
              <input
                type="text"
                placeholder="Search by subject, location, class or title..."
                className="input input-bordered w-full pl-9 input-sm md:input-md"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* 🎯 Text Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Class filter (input) */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase text-base-content/60">
                  Class
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Class 8, HSC"
                className="input input-bordered input-sm md:input-md w-full"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />
            </div>

            {/* Subject filter (input) */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase text-base-content/60">
                  Subject
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Math, Physics"
                className="input input-bordered input-sm md:input-md w-full"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              />
            </div>

            {/* Location filter (input) */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase text-base-content/60">
                  Location
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mirpur, Dhanmondi"
                className="input input-bordered input-sm md:input-md w-full"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
          </div>

          {/* 🔃 Sort */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold uppercase text-base-content/60">
                Sort By
              </span>
            </label>
            <select
              className="select select-bordered select-sm md:select-md w-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date_desc">Newest first</option>
              <option value="date_asc">Oldest first</option>
              <option value="salary_desc">Salary: High to Low</option>
              <option value="salary_asc">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Small info text */}
        <div className="mt-2 text-[11px] text-base-content/60 text-right">
          Showing {paginatedTuitions.length} of {totalItems} tuitions
        </div>
      </div>

      {/* ====================== GRID ====================== */}
      {paginatedTuitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow border border-base-300"
            >
              <div className="card-body">
                <h3 className="card-title text-xl mb-2 line-clamp-2">
                  {tuition.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge badge-primary badge-sm">
                    {tuition.subject}
                  </span>
                  <span className="badge badge-secondary badge-sm">
                    {tuition.classLevel}
                  </span>
                  <span className="badge badge-ghost badge-sm capitalize">
                    {tuition.medium}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    {tuition.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-success" />
                    ৳{tuition.salary}/month
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

                {/* VIEW DETAILS (with login check) */}
                <div className="card-actions mt-4">
                  <Link
                    to={`/tuitions/${tuition._id}`}
                    onClick={(e) => handleViewDetails(e, tuition._id)}
                    className="btn btn-primary btn-sm w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No result state
        <div className="text-center py-12">
          <FaBookReader className="text-6xl text-base-content/30 mx-auto mb-4" />
          <p className="text-xl text-base-content/60 font-semibold">
            No tuitions found
          </p>
          <p className="text-sm text-base-content/50 mt-1">
            Try changing your search text or filters.
          </p>
        </div>
      )}

      {/* ====================== PAGINATION CONTROLS ====================== */}
      {totalItems > itemsPerPage && (
        <div className="mt-10 flex justify-center">
          <div className="join">
            <button
              className="btn btn-sm join-item"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              «
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`btn btn-sm join-item ${
                    page === currentPage ? "btn-primary" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className="btn btn-sm join-item"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutions;
