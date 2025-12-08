import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["tutorRevenue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/tutor?email=${user.email}`
      );
      return res.data;
    },
  });

  const totalAmount = useMemo(
    () => payments.reduce((sum, p) => sum + (p.amount || 0), 0),
    [payments]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-4 md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Revenue History</h2>
          <p className="text-sm text-base-content/60">
            See your total earnings and transaction details.
          </p>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Received</div>
            <div className="stat-value text-success">৳{totalAmount}</div>
            <div className="stat-desc">{payments.length} payments</div>
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <p className="text-center text-base-content/60 py-8">
          You haven't received any payment yet.
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
                <th>Student</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td className="font-mono text-xs">{p.transactionId}</td>
                  <td className="font-mono text-xs">{p.trackingId}</td>
                  <td className="font-semibold text-success">৳{p.amount}</td>
                  <td className="text-xs">{p.studentEmail}</td>
                  <td>
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : "N/A"}
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

export default RevenueHistory;