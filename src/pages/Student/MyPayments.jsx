import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

 
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

  
  const totalPaid = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

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
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>

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
                    <span className="text-sm">
                      {pay.tutorEmail || "N/A"}
                    </span>
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
        </div>
      )}
    </div>
  );
};

export default MyPayments;
