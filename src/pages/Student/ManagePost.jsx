// src/pages/Student/ManagePost.jsx

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManagePost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal er data
  const [editingTuition, setEditingTuition] = useState(null);

  // ---------- Load all tuitions posted by this student ----------
  const fetchMyTuitions = async () => {
    try {
      setLoading(true);

      const res = await axiosSecure.get(
        `/tutions?studentEmail=${encodeURIComponent(user?.email)}`
      );

      setTuitions(res.data || []);
    } catch (error) {
      console.error("Failed to load tuitions", error);
      Swal.fire("Error", "Failed to load your tuitions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyTuitions();
    }
  }, [user?.email]);

  // ---------- Delete tuition ----------
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this tuition post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/tutions/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Tuition has been deleted.", "success");
        setTuitions((prev) => prev.filter((t) => t._id !== id));
      } else {
        Swal.fire("Info", "Nothing was deleted.", "info");
      }
    } catch (error) {
      console.error("Failed to delete tuition", error);
      Swal.fire("Error", "Failed to delete tuition", "error");
    }
  };

  // ---------- Edit modal open/close ----------
  const openEditModal = (tuition) => {
    setEditingTuition(tuition);
  };

  const closeEditModal = () => {
    setEditingTuition(null);
  };

  // ---------- Handle Update submission ----------
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      subject: form.subject.value,
      classLevel: form.classLevel.value,
      medium: form.medium.value,
      salary: Number(form.salary.value),
      daysPerWeek: form.daysPerWeek.value,
      location: form.location.value,
      tuitionType: form.tuitionType.value,
      contactNumber: form.contactNumber.value,
      deadline: form.deadline.value,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/tutions/${editingTuition._id}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Tuition updated successfully.", "success");

        // Local state update
        setTuitions((prev) =>
          prev.map((t) =>
            t._id === editingTuition._id ? { ...t, ...updatedData } : t
          )
        );

        closeEditModal();
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (error) {
      console.error("Failed to update tuition", error);
      Swal.fire("Error", "Failed to update tuition", "error");
    }
  };

  // ---------- Loading UI ----------
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* --- Header Section --- */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Manage Posts</h1>
          <p className="text-base-content/60 mt-1 text-sm">
             Review and manage your tuition listings.
          </p>
        </div>
        
        <div className="stats shadow-sm bg-base-200/50 border border-base-200">
          <div className="stat py-2 px-6">
            <div className="stat-title text-xs font-bold uppercase tracking-wider opacity-60">Total Posts</div>
            <div className="stat-value text-primary text-2xl">{tuitions.length}</div>
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      {tuitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-3xl border border-dashed border-base-300 text-center">
          <div className="text-6xl mb-4 opacity-20">📂</div>
          <h3 className="text-xl font-bold text-base-content">No Posts Found</h3>
          <p className="text-base-content/60 mb-6 max-w-xs mx-auto">
            You haven't posted any tuition requests yet.
          </p>
          <button className="btn btn-primary px-8 rounded-full">Post New Tuition</button>
        </div>
      ) : (
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Table Head */}
              <thead className="bg-base-200/50 text-base-content/60 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-5 pl-6">#</th>
                  <th>Details</th>
                  <th>Class & Medium</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th className="text-right pr-6">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-base-200">
                {tuitions.map((t, index) => (
                  <tr key={t._id} className="hover:bg-base-200/30 transition-colors duration-200">
                    <th className="pl-6 text-base-content/40 font-medium">{index + 1}</th>

                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-base-content mb-1">{t.title || "Untitled"}</span>
                        <span className="badge badge-ghost badge-sm border-base-300 text-xs font-normal text-base-content/70">
                          {t.subject || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">{t.classLevel || "N/A"}</span>
                        <span className="text-xs text-base-content/50 uppercase font-bold tracking-wide">
                          {t.medium || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="font-bold text-primary text-lg">
                         <span className="text-sm font-normal text-base-content/60 mr-1">৳</span>
                         {t.salary || 0}
                      </div>
                    </td>

                    <td>
                      <div className={`badge badge-sm font-semibold py-3 px-4 border-0 ${
                          t.status === "approved" ? "bg-success/10 text-success" : 
                          t.status === "rejected" ? "bg-error/10 text-error" : 
                          "bg-warning/10 text-warning"
                        }`}>
                        {t.status === "approved" && "● Approved"}
                        {t.status === "rejected" && "● Rejected"}
                        {(!t.status || t.status === "pending") && "● Pending"}
                      </div>
                    </td>

                    <td className="text-right pr-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEditModal(t)}
                          className="btn btn-sm btn-secondary text-white font-semibold hover:bg-black  "
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="btn btn-sm btn-primary text-white font-semibold hover:bg-black"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- Edit Modal ---------- */}
      {editingTuition && (
        <dialog className="modal modal-open modal-bottom sm:modal-middle bg-black/50 backdrop-blur-sm">
          <div className="modal-box w-11/12 max-w-3xl p-0 overflow-hidden rounded-3xl shadow-2xl">
            
            {/* Modal Header */}
            <div className="bg-base-100 px-8 py-6 border-b border-base-200 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="font-bold text-2xl text-base-content">Edit Tuition</h3>
                <p className="text-xs text-base-content/50 mt-1 uppercase tracking-wide">Updating Details</p>
              </div>
              <button 
                onClick={closeEditModal} 
                className="btn btn-sm btn-circle btn-ghost text-base-content/40 hover:bg-base-200"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdate} className="p-8 bg-base-100 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Block 1 */}
                <div className="space-y-4">
                   <div className="form-control">
                      <label className="label text-xs font-bold text-base-content/60 uppercase">Title</label>
                      <input name="title" type="text" defaultValue={editingTuition.title} className="input input-bordered w-full focus:input-primary bg-base-200/30" required />
                   </div>
                   <div className="form-control">
                      <label className="label text-xs font-bold text-base-content/60 uppercase">Subject</label>
                      <input name="subject" type="text" defaultValue={editingTuition.subject} className="input input-bordered w-full focus:input-primary bg-base-200/30" required />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label text-xs font-bold text-base-content/60 uppercase">Class</label>
                        <input name="classLevel" type="text" defaultValue={editingTuition.classLevel} className="input input-bordered w-full focus:input-primary bg-base-200/30" required />
                      </div>
                      <div className="form-control">
                        <label className="label text-xs font-bold text-base-content/60 uppercase">Medium</label>
                        <select name="medium" defaultValue={editingTuition.medium} className="select select-bordered w-full focus:select-primary bg-base-200/30" required>
                          <option value="bangla">Bangla Medium</option>
                          <option value="english">English Medium</option>
                          <option value="english-version">English Version</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                   </div>
                </div>

                {/* Block 2 */}
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label text-xs font-bold text-base-content/60 uppercase">Salary (BDT)</label>
                        <input name="salary" type="number" min="1" defaultValue={editingTuition.salary} className="input input-bordered w-full focus:input-primary bg-base-200/30 font-bold text-primary" required />
                      </div>
                      <div className="form-control">
                        <label className="label text-xs font-bold text-base-content/60 uppercase">Days/Week</label>
                        <select name="daysPerWeek" defaultValue={editingTuition.daysPerWeek} className="select select-bordered w-full focus:select-primary bg-base-200/30" required>
                          {[2,3,4,5,6,7].map(num => <option key={num} value={num}>{num} Days</option>)}
                        </select>
                      </div>
                   </div>
                   <div className="form-control">
                      <label className="label text-xs font-bold text-base-content/60 uppercase">Location</label>
                      <input name="location" type="text" defaultValue={editingTuition.location} className="input input-bordered w-full focus:input-primary bg-base-200/30" required />
                   </div>
                   <div className="form-control">
                      <label className="label text-xs font-bold text-base-content/60 uppercase">Deadline</label>
                      <input name="deadline" type="date" defaultValue={editingTuition.deadline} className="input input-bordered w-full focus:input-primary bg-base-200/30" required />
                   </div>
                </div>
              </div>

              {/* Full Width Block */}
              <div className="mt-4 space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label text-xs font-bold text-base-content/60 uppercase">Contact</label>
                        <input name="contactNumber" type="tel" defaultValue={editingTuition.contactNumber} className="input input-bordered w-full focus:input-primary bg-base-200/30" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-xs font-bold text-base-content/60 uppercase">Tuition Type</label>
                        <select name="tuitionType" defaultValue={editingTuition.tuitionType} className="select select-bordered w-full focus:select-primary bg-base-200/30" required>
                          <option value="home">Home Tutoring</option>
                          <option value="online">Online Tutoring</option>
                          <option value="coaching">Coaching / Group</option>
                        </select>
                    </div>
                 </div>
                 
                 <div className="form-control">
                    <label className="label text-xs font-bold text-base-content/60 uppercase">Description</label>
                    <textarea name="description" defaultValue={editingTuition.description} className="textarea textarea-bordered w-full h-24 focus:textarea-primary bg-base-200/30" required />
                 </div>
              </div>

              {/* Footer Actions */}
              <div className="modal-action pt-6 mt-6 border-t border-base-200">
                <button type="button" className="btn btn-ghost hover:bg-base-200" onClick={closeEditModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-8 rounded-lg shadow-lg shadow-primary/20">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          {/* Backdrop Click to Close */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeEditModal}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManagePost;
