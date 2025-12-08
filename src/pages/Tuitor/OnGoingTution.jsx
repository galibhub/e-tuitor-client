import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const OnGoingTution = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: ongoing = [], isLoading } = useQuery({
    queryKey: ["ongoingTuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?tutorEmail=${user.email}&status=approved`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Ongoing Tuitions</h2>
          <p className="text-sm text-base-content/60">
            All tuitions that have been approved by students.
          </p>
        </div>
        <div className="badge badge-accent badge-lg font-semibold">
          Total: {ongoing.length}
        </div>
      </div>

      {ongoing.length === 0 ? (
        <p className="text-center text-base-content/60 py-8">
          No ongoing tuitions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition</th>
                <th>Student</th>
                <th>Paid Amount</th>
                <th>Tracking ID</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {ongoing.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="font-semibold">{app.tuitionTitle}</p>
                  </td>
                  <td>
                    <p className="text-sm">{app.studentName}</p>
                    <p className="text-xs text-base-content/60">
                      {app.studentEmail}
                    </p>
                  </td>
                  <td>
                    <span className="font-semibold text-success">
                      ৳{app.paidAmount || app.expectedSalary}
                    </span>
                  </td>
                  <td>
                    <span className="font-mono text-xs">
                      {app.trackingId || "N/A"}
                    </span>
                  </td>
                  <td>
                    {app.paidAt
                      ? new Date(app.paidAt).toLocaleDateString()
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

export default OnGoingTution;