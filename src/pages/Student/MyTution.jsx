import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyTution = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  
  const {
    data: approvedTuitions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myApprovedTuitions", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?studentEmail=${user.email}&status=approved`
      );
      return res.data;
    },
  });

  
  const totalPaid = approvedTuitions.reduce(
    (sum, app) => sum + Number(app.paidAmount || app.expectedSalary || 0),
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
          Failed to load your tuitions
        </h2>
        <p className="text-sm text-base-content/70">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Tuitions</h2>
          <p className="text-sm text-base-content/60">
            All tuitions you have paid for, with the tutor details who will teach you.
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="font-semibold text-lg">
            Total Tuitions:{" "}
            <span className="text-primary">{approvedTuitions.length}</span>
          </div>
          <div className="text-sm text-base-content/60">
            Total Paid:{" "}
            <span className="font-bold text-success">৳{totalPaid}</span>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {approvedTuitions.length === 0 ? (
        <div className="text-center py-10 text-base-content/60">
          <p className="text-lg font-medium mb-1">
            You have no approved tuitions yet.
          </p>
          <p className="text-sm">
            Post a tuition and approve a tutor to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {approvedTuitions.map((app) => (
            <div
              key={app._id}
              className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              {/* Top: Tuition info */}
              <div className="card-body pb-3">
                <h3 className="card-title text-lg mb-1">
                  {app.tuitionTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="badge badge-success badge-outline">
                    Approved
                  </span>
                  {app.trackingId && (
                    <span className="badge badge-ghost">
                      Tracking: {app.trackingId}
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-1 text-sm text-base-content/80">
                  <p>
                    <span className="font-semibold">Paid Amount:</span>{" "}
                    <span className="text-success font-bold">
                      ৳{app.paidAmount || app.expectedSalary}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Expected Monthly Salary:</span>{" "}
                    ৳{app.expectedSalary}
                  </p>
                  <p className="text-xs text-base-content/60">
                    Approved on:{" "}
                    {app.paidAt
                      ? new Date(app.paidAt).toLocaleDateString()
                      : app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-base-200" />

              {/* Bottom: Tutor info */}
              <div className="p-4 flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary/40 ring-offset-2 ring-offset-base-100 overflow-hidden bg-base-200 flex items-center justify-center">
                    {app.tutorPhoto ? (
                      <img
                        src={app.tutorPhoto}
                        alt={app.tutorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold">
                        {app.tutorName?.charAt(0)?.toUpperCase() || "T"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-base">{app.tutorName}</p>
                  <p className="text-xs text-base-content/60">
                    {app.tutorEmail}
                  </p>
                  <p className="text-xs mt-1 text-base-content/70 line-clamp-2">
                    <span className="font-semibold">Qualifications:</span>{" "}
                    {app.qualifications}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTution;
