import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://timocombackend.vercel.app/api/v1/users/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(data.users || []);
    } catch (err) {
      toast.error("Failed to fetch users ❌");
      setUsers([]);
    }
  };

  // DELETE USER
  const deleteUser = async () => {
    try {
      await axios.delete(
        `https://timocombackend.vercel.app/api/v1/users/admin/user/${selectedUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("User deleted 🗑️");
      setDeleteModal(false);
      fetchUsers();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // FILTER USERS
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = search.toLowerCase();

    return fullName.includes(query) || email.includes(query);
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users-container">

      {/* TITLE */}
      <h2 className="users-title">👥 Admin Users Dashboard</h2>

      {/* 📊 STATS BAR */}
      <div className="stats-bar">
        <div className="stat-card">
          <h4>{users.length}</h4>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h4>{filteredUsers.length}</h4>
          <p>Showing</p>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search users by name or email..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* USERS */}
      {filteredUsers.length > 0 ? (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user._id}>

              <div className="avatar">
                {user.firstName?.charAt(0)}
              </div>

              <h5>{user.firstName} {user.lastName}</h5>
              <p>{user.email}</p>

              <button
                className="delete-btn"
                onClick={() => {
                  setSelectedUser(user);
                  setDeleteModal(true);
                }}
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users">
          {search ? "No matching users found" : "No users found"}
        </p>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Delete User</h4>
            <p>Are you sure you want to delete this user?</p>

            <div className="modal-actions">
              <button onClick={() => setDeleteModal(false)}>
                Cancel
              </button>
              <button onClick={deleteUser} className="danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default AdminUsers;