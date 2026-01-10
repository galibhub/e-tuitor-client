import React, { useState } from "react"; // Added useState
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const AppliedTuitor = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // --- PAGINATION STATE (NEW) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Showing 5 items per page

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?studentEmail=${user.email}`
      );
      return res.data;
    },
  });

  // --- PAGINATION CALCULATION (NEW) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the data to get only the items for the current page
  const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/applications/${applicationId}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title:
            newStatus === "approved"
              ? "Application Approved"
              : "Application Rejected",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not update status. Try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Applied Tutors</h2>
          <p className="text-sm text-base-content/60">
            Tutors who applied to your tuition posts.
          </p>
        </div>
        <div className="badge badge-primary badge-lg font-semibold">
          Total Applications: {applications.length}
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-center text-base-content/60 py-8">
          No tutor has applied yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tutor</th>
                <th>Tuition</th>
                <th>Qualifications</th>
                <th>Experience</th>
                <th>Expected Salary</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {/* Map over 'currentItems' instead of 'applications' */}
            <tbody>
              {currentItems.map((app, index) => (
                <tr key={app._id}>
                  {/* Calculate correct index based on page number */}
                  <td>{indexOfFirstItem + index + 1}</td>

                  {/* Tutor info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {app.tutorName?.charAt(0)?.toUpperCase() || "T"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{app.tutorName}</p>
                        <p className="text-xs text-base-content/60">
                          {app.tutorEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Tuition title */}
                  <td>
                    <p className="font-medium">{app.tuitionTitle}</p>
                  </td>

                  {/* Qualifications */}
                  <td className="max-w-xs">
                    <p className="text-xs text-base-content/80 line-clamp-3">
                      {app.qualifications}
                    </p>
                  </td>

                  {/* Experience */}
                  <td className="max-w-xs">
                    <p className="text-xs text-base-content/80 line-clamp-3">
                      {app.experience}
                    </p>
                  </td>

                  {/* Expected Salary */}
                  <td>
                    <span className="font-semibold text-success">
                      ৳{app.expectedSalary}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge badge-sm ${
                        app.status === "approved"
                          ? "badge-success"
                          : app.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex flex-col lg:flex-row gap-2 justify-center">
                      <Link
                        to={`/dashboard/payments/${app._id}`}
                        className={`btn btn-xs btn-success ${
                          app.status === "approved" ? "btn-disabled" : ""
                        }`}
                      >
                        Accept
                      </Link>

                      <button
                        onClick={() => handleUpdateStatus(app._id, "rejected")}
                        className="btn btn-xs btn-error"
                        disabled={app.status === "rejected"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- PAGINATION CONTROLS (NEW) --- */}
          {applications.length > itemsPerPage && (
            <div className="p-4 flex justify-center mt-4">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`join-item btn btn-sm ${
                      currentPage === i + 1 ? "btn-active btn-primary" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
          {/* --- END PAGINATION CONTROLS --- */}
        </div>
      )}
    </div>
  );
};

export default AppliedTuitor;