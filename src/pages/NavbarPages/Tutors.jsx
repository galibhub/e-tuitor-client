import React from "react";
import { FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaSearch, FaUserGraduate } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tutors = () => {
  const axiosSecure = useAxiosSecure();

 
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["allTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/latest"); 
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Decorative Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        
       {/* --- Header Section --- */}
<div className="flex flex-col items-center text-center mb-12 gap-6">
  <div>
    <h1 className="text-4xl font-bold mb-2">
      Find Your <span className="text-primary">Perfect Tutor</span>
    </h1>
    <p className="text-base-content/60 max-w-md mx-auto">
      Browse our community of verified expert tutors tailored to your learning goals.
    </p>
  </div>
</div>

        {/* --- Content Grid --- */}
        {tutors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <FaUserGraduate className="text-6xl mb-4 text-base-content/30" />
            <p className="text-xl font-medium">No tutors found.</p>
            <p className="text-sm">Try adjusting your search or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group overflow-hidden"
              >
                {/* 1. Card Header (Gradient Cover) */}
                <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                     <div className={`badge ${tutor.status === 'active' ? 'badge-success text-white' : 'badge-ghost bg-base-100/50'} gap-2 shadow-sm border-0`}>
                        <div className={`w-2 h-2 rounded-full ${tutor.status === 'active' ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
                        {tutor.status || "Inactive"}
                     </div>
                  </div>
                </div>

                {/* 2. Avatar & Name Section */}
                <div className="px-6 relative">
                  {/* Floating Avatar */}
                  <div className="-mt-12 mb-3">
                    <div className="avatar">
                      <div className="w-24 h-24 rounded-2xl ring-4 ring-base-100 shadow-lg bg-base-100">
                        <img
                          src={tutor.photoURL || "https://i.ibb.co/WchFhLg/user.png"}
                          alt={tutor.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {tutor.name}
                      </h3>
                      <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider mt-1">
                        Registered Tutor
                      </p>
                    </div>
                    {/* ID Badge */}
                    <div className="tooltip" data-tip="Tutor ID">
                      <span className="badge badge-sm badge-outline opacity-50 font-mono">
                        #{tutor.uid?.slice(0, 5)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Info Body */}
                <div className="p-6 space-y-4">
                  <div className="bg-base-200/50 rounded-xl p-4 space-y-3">
                    {/* Email */}
                    <div className="flex items-center gap-3 text-sm group/item">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                        <FaEnvelope size={12} />
                      </div>
                      <span className="text-base-content/70 truncate">{tutor.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 text-sm group/item">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                        <FaPhoneAlt size={12} />
                      </div>
                      <span className="text-base-content/70">
                        {tutor.phone || <span className="italic opacity-50">Hidden</span>}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-base-content/40 justify-center pt-2">
                    <FaCalendarAlt />
                    <span>Joined {tutor.createdAt ? new Date(tutor.createdAt).toLocaleDateString() : "Recently"}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutors;
