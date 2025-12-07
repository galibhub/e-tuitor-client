import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // 👈 path project অনুযায়ী adjust করো
import Swal from "sweetalert2";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();

  // 1️⃣ Load pending tuitions
  const { data: tuitions = [], refetch, isLoading } = useQuery({
    queryKey: ["tutions", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutions?status=pending");
      return res.data;
    },
  });

  // 2️⃣ Update status (approve / reject) – future use
  const updateTuitionStatus = (tuition, status) => {
    const updateInfo = { status };

    axiosSecure
      .patch(`/tutions/${tuition._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Tuition status set to ${status}.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleApprove = (tuition) => {
    updateTuitionStatus(tuition, "approved");
  };

  const handleDelete = (tuition) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tuition post will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/tutions/${tuition._id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Tuition has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (isLoading) {
    return <div className="p-4">Loading pending tuitions...</div>;
  }

  return (
   <div className="p-4 md:p-6">
  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
    Pending Tuitions: {tuitions.length}
  </h2>

  {/* Mobile Card View */}
  <div className="block lg:hidden space-y-4">
    {tuitions.map((tuition, index) => (
      <div key={tuition._id} className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="card-title text-lg">{tuition.title}</h3>
            <span className="badge badge-warning">{tuition.status}</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Student:</span> {tuition.studentName}</p>
            <p><span className="font-semibold">Subject:</span> {tuition.subject}</p>
            <p><span className="font-semibold">Class:</span> {tuition.classLevel}</p>
            <p><span className="font-semibold">Location:</span> {tuition.location}</p>
            <p><span className="font-semibold">Salary:</span> ৳{tuition.salary}</p>
          </div>

          <div className="card-actions justify-end mt-4 gap-2">
            <button
              onClick={() => handleApprove(tuition)}
              className="btn btn-sm btn-success flex-1"
              disabled={tuition.status === "approved"}
            >
              Approve
            </button>
            <button
              onClick={() => handleDelete(tuition)}
              className="btn btn-sm btn-error flex-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}

    {tuitions.length === 0 && (
      <div className="text-center py-8 text-base-content/60">
        No pending tuitions found.
      </div>
    )}
  </div>

  {/* Desktop Table View */}
  <div className="hidden lg:block overflow-x-auto">
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Student</th>
          <th>Subject</th>
          <th>Class</th>
          <th>Location</th>
          <th>Salary</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tuitions.map((tuition, index) => (
          <tr key={tuition._id}>
            <th>{index + 1}</th>
            <td>{tuition.title}</td>
            <td>{tuition.studentName}</td>
            <td>{tuition.subject}</td>
            <td>{tuition.classLevel}</td>
            <td>{tuition.location}</td>
            <td>৳{tuition.salary}</td>
            <td>
              <span className="badge badge-warning">{tuition.status}</span>
            </td>
            <td className="space-x-2">
              <button
                onClick={() => handleApprove(tuition)}
                className="btn btn-sm btn-success"
                disabled={tuition.status === "approved"}
              >
                Approve
              </button>

              <button
                onClick={() => handleDelete(tuition)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        {tuitions.length === 0 && (
          <tr>
            <td colSpan="9" className="text-center py-6 text-base-content/60">
              No pending tuitions found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default TuitionManagement;
