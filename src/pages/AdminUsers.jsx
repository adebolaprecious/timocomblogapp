import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://timocombackend.vercel.app/api/v1/users/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(data.users || []);
    } catch (err) {
      toast.error("Failed to fetch users ❌");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteUser = async () => {
    try {
      await axios.delete(
        `https://timocombackend.vercel.app/api/v1/users/admin/user/${selectedUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User deleted successfully 🗑️");
      setDeleteModal(false);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user ❌");
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const email = (user.email || "").toLowerCase();
    const query = search.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
        }

        .admin-users-page {
          width: 100%;
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Sticky Header */
        .admin-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          padding: 20px 25px;
        }

        .dashboard-title {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 20px;
          color: #1e293b;
        }

        .stats-bar {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .stat-card {
          background: white;
          padding: 15px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          flex: 1;
          min-width: 160px;
          text-align: center;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #198754;
        }

        /* Search */
        .search-input {
          width: 100%;
          max-width: 500px;
          padding: 12px 20px;
          border: 1px solid #ddd;
          border-radius: 30px;
          outline: none;
          font-size: 15px;
          margin: 20px auto;
          display: block;
        }

        .search-input:focus {
          border-color: #198754;
          box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
        }

        /* Users Grid */
        .users-grid {
          padding: 0 25px 40px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .user-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          text-align: center;
          transition: 0.3s;
        }

        .user-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .avatar {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #198754, #146c43);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
          margin: 0 auto 15px;
        }

        .user-card h5 {
          margin: 10px 0 5px;
          font-weight: 700;
        }

        .user-card p {
          color: #64748b;
          font-size: 14px;
        }

        .delete-btn {
          margin-top: 15px;
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-box {
          background: white;
          padding: 30px;
          border-radius: 16px;
          width: 90%;
          max-width: 400px;
          text-align: center;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }

        .modal-actions button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .danger {
          background: #ef4444;
          color: white;
        }

        .no-users {
          text-align: center;
          color: #94a3b8;
          padding: 60px 20px;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .users-grid {
            grid-template-columns: 1fr;
            padding: 0 15px 30px;
          }
          .admin-header {
            padding: 15px 20px;
          }
        }
      `}</style>

      <div className="admin-users-page">

        {/* Sticky Header */}
        <div className="admin-header">
          <h2 className="dashboard-title">👥 Manage Users</h2>

          <div className="stats-bar">
            <div className="stat-card">
              <div className="stat-number">{users.length}</div>
              <div>Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{filteredUsers.length}</div>
              <div>Showing Now</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Users Grid */}
        {filteredUsers.length > 0 ? (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div className="user-card" key={user._id}>
                <div className="avatar">
                  {user.firstName?.[0]}{user.lastName?.[0]}
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

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h4>Delete User</h4>
              <p>Are you sure you want to permanently delete this user?</p>
              <p className="text-danger fw-bold">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </p>

              <div className="modal-actions">
                <button onClick={() => setDeleteModal(false)}>Cancel</button>
                <button className="danger" onClick={deleteUser}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer autoClose={2000} />
    </>
  );
};

export default AdminUsers;