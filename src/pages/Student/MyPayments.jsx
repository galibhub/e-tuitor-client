import React, { useState } from "react"; // Added useState
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // --- PAGINATION STATE (NEW) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this to 10

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/student?email=${user.email}`
      );
      return res.data;
    },
  });

  // Calculate Total (Uses all data, not just current page)
  const totalPaid = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  // --- PAGINATION CALCULATION (NEW) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the data to show only current page items
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-base-100 rounded-2xl shadow-lg border border-error/30 p-6">
        <h2 className="text-xl font-bold text-error mb-2">
          Failed to load your payments
        </h2>
        <p className="text-sm text-base-content/70">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Payments</h2>
          <p className="text-sm text-base-content/60">
            All payments you have made to tutors for your tuitions.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-base-content/60">
            Total Payments:{" "}
            <span className="font-semibold text-primary">
              {payments.length}
            </span>
          </p>
          <p className="text-sm text-base-content/60">
            Total Amount Paid:{" "}
            <span className="font-bold text-success">৳{totalPaid}</span>
          </p>
        </div>
      </div>

      {/* Empty state */}
      {payments.length === 0 ? (
        <p className="text-center text-base-content/60 py-8">
          You have not made any payments yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Tracking ID</th>
                <th>Amount</th>
                <th>Tutor</th>
                <th>Date</th>
              </tr>
            </thead>
            {/* Map over currentPayments instead of payments */}
            <tbody>
              {currentPayments.map((pay, index) => (
                <tr key={pay._id}>
                  {/* Correct index calculation across pages */}
                  <td>{indexOfFirstItem + index + 1}</td>

                  <td className="max-w-xs">
                    <span className="font-mono text-xs break-all">
                      {pay.transactionId}
                    </span>
                  </td>

                  <td>
                    <span className="font-mono text-xs">
                      {pay.trackingId || "-"}
                    </span>
                  </td>

                  <td>
                    <span className="font-semibold text-success">
                      ৳{pay.amount}
                    </span>
                  </td>

                  <td>
                    <span className="text-sm">{pay.tutorEmail || "N/A"}</span>
                  </td>

                  <td>
                    <span className="text-sm">
                      {pay.createdAt
                        ? new Date(pay.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- PAGINATION CONTROLS (NEW) --- */}
          {payments.length > itemsPerPage && (
            <div className="flex justify-center mt-6">
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
          {/* --- END CONTROLS --- */}
        </div>
      )}
    </div>
  );
};

export default MyPayments;