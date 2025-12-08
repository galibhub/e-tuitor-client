import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // Load all users
  const fetchUsers = async () => {
    const res = await axiosSecure.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change user role
  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Confirm Role Change",
      text: `Do you want to change the role to "${newRole}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Change",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#a1a1aa",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/admin/users/${id}`, { role: newRole });

        Swal.fire({
          icon: "success",
          title: "Role Updated!",
          text: "User role has been changed successfully.",
          timer: 1300,
          showConfirmButton: false,
        });

        fetchUsers();
      }
    });
  };

  // Delete user
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "Deleting a user cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/users/${id}`);

        Swal.fire({
          icon: "success",
          title: "User Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });

        fetchUsers();
      }
    });
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        User Management
      </h1>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-300">
        <table className="table">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Photo</th>
              <th>Name & Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover">
                {/* Photo */}
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-2">
                      <img
                        src={user.photoURL || "/default-user.png"}
                        alt="User"
                      />
                    </div>
                  </div>
                </td>

                {/* Name + Email */}
                <td>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-base-content/60">{user.email}</p>
                </td>

                {/* Role Dropdown */}
                <td>
                  <select
                    className="select select-bordered select-sm w-36"
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      user.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Delete Button */}
                <td className="text-center">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
