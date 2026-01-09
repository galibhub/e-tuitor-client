import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { 
  FaChalkboardTeacher, 
  FaCheckCircle, 
  FaMoneyBillWave, 
  FaUserTie, 
  FaEnvelope, 
  FaCalendarAlt,
  FaIdCard
} from "react-icons/fa";

// --- COMPONENT: Skeleton Loader ---
const MyTuitionSkeleton = () => (
  <div className="card border border-base-200 shadow-sm animate-pulse h-full">
    <div className="p-5 space-y-3">
      <div className="h-6 bg-base-300 rounded w-3/4"></div>
      <div className="flex gap-2">
        <div className="h-5 bg-base-300 rounded w-20"></div>
        <div className="h-5 bg-base-300 rounded w-24"></div>
      </div>
      <div className="h-4 bg-base-300 rounded w-1/2 mt-2"></div>
    </div>
    <div className="bg-base-200/50 p-4 mt-auto flex items-center gap-4">
      <div className="w-12 h-12 bg-base-300 rounded-full"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-base-300 rounded w-1/2"></div>
        <div className="h-3 bg-base-300 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((n) => <MyTuitionSkeleton key={n} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Failed to load data. Please refresh.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* --- PAGE HEADER & STATS --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-base-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaChalkboardTeacher className="text-primary" /> My Hired Tutors
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Manage your active tuitions and view tutor details.
          </p>
        </div>

        {/* Mini Stats Box */}
        <div className="flex gap-4">
          <div className="stats shadow bg-base-100 border border-base-200">
            <div className="stat px-4 py-2 place-items-center">
              <div className="stat-title text-xs uppercase tracking-wide">Hired</div>
              <div className="stat-value text-primary text-2xl">{approvedTuitions.length}</div>
            </div>
            <div className="stat px-4 py-2 place-items-center">
              <div className="stat-title text-xs uppercase tracking-wide">Spent</div>
              <div className="stat-value text-secondary text-2xl">৳{totalPaid}</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      {approvedTuitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-base-100 rounded-2xl border border-dashed border-base-300">
          <div className="bg-base-200 p-4 rounded-full mb-3">
            <FaUserTie className="text-4xl text-base-content/30" />
          </div>
          <h3 className="text-lg font-bold text-base-content/70">No Active Tuitions</h3>
          <p className="text-sm text-base-content/50">You haven't hired any tutors yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {approvedTuitions.map((app) => (
            <div
              key={app._id}
              className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden group"
            >
              {/* Top: Tuition Details */}
              <div className="card-body p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1" title={app.tuitionTitle}>
                    {app.tuitionTitle}
                  </h3>
                  <div className="badge badge-success text-white gap-1 font-bold shadow-sm shrink-0">
                    <FaCheckCircle className="text-xs" /> Active
                  </div>
                </div>

                <div className="text-sm space-y-2 text-base-content/70">
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-success" />
                    Paid: <span className="font-bold text-base-content">৳{app.paidAmount || app.expectedSalary}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    Hired on: {app.paidAt ? new Date(app.paidAt).toLocaleDateString() : new Date(app.createdAt).toLocaleDateString()}
                  </p>
                  {app.trackingId && (
                    <div className="badge badge-ghost badge-sm gap-1 mt-1 opacity-70">
                      <FaIdCard /> ID: {app.trackingId}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom: Tutor Profile (Distinct Background) */}
              <div className="bg-base-200/50 p-4 border-t border-base-200 flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={app.tutorPhoto || "https://i.ibb.co/WchFhLg/user.png"}
                      alt={app.tutorName}
                      className="object-cover"
                      onError={(e) => e.target.src = "https://i.ibb.co/WchFhLg/user.png"}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-base-content truncate">{app.tutorName}</p>
                  <p className="text-xs text-base-content/60 flex items-center gap-1 truncate">
                    <FaEnvelope className="text-[10px]" /> {app.tutorEmail}
                  </p>
                  {app.qualifications && (
                    <p className="text-xs text-primary mt-1 font-medium truncate">
                      {app.qualifications}
                    </p>
                  )}
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