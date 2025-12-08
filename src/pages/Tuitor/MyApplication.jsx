import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutorApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?tutorEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id, status) => {
    if (status === "approved") {
      Swal.fire("Oops!", "Approved application can't be deleted.", "info");
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/applications/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Application removed.", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Could not delete. Try again.", "error");
    }
  };

  const handleEditSalary = async (app) => {
    if (app.status === "approved") {
      Swal.fire("Not allowed", "Approved application can't be edited.", "info");
      return;
    }

    const { value: newSalary } = await Swal.fire({
      title: "Update Expected Salary",
      input: "number",
      inputLabel: "New expected monthly salary",
      inputValue: app.expectedSalary,
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!newSalary) return;

    try {
      const res = await axiosSecure.patch(`/applications/${app._id}`, {
        expectedSalary: newSalary,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Expected salary updated.", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Could not update. Try again.", "error");
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
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold">My Applications</h2>
          <p className="text-sm text-base-content/60">
            Track all tuitions you have applied for.
          </p>
        </div>
        <div className="badge badge-secondary badge-lg font-semibold">
          Total: {applications.length}
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-center text-base-content/60 py-8">
          You haven't applied to any tuition yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition</th>
                <th>Student</th>
                <th>Expected Salary</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
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
                    <span className="font-semibold text-primary">
                      ৳{app.expectedSalary}
                    </span>
                  </td>
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
                  <td>
                    <div className="flex flex-col lg:flex-row gap-2 justify-center">
                      <button
                        onClick={() => handleEditSalary(app)}
                        className="btn btn-xs btn-info"
                        disabled={app.status === "approved"}
                      >
                        Edit Salary
                      </button>
                      <button
                        onClick={() => handleDelete(app._id, app.status)}
                        className="btn btn-xs btn-error"
                        disabled={app.status === "approved"}
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
      )}
    </div>
  );
};

export default MyApplication;