import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMenu, setShowMenu] = useState(null); // for 3-dot menu

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userRes = await axios.get(
        "https://timocombackend.vercel.app/api/v1/users/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const loggedUser = userRes.data.user;
      setUser(loggedUser);

      setEditForm({
        firstName: loggedUser.firstName || "",
        lastName: loggedUser.lastName || "",
        email: loggedUser.email || "",
        bio: loggedUser.bio || ""
      });

      const { data } = await axios.get(
        `https://timocombackend.vercel.app/api/v1/posts/user/${loggedUser.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(data.posts || []);
    } catch (err) {
      toast.error("Failed to load profile ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.post(
        "https://timocombackend.vercel.app/api/v1/posts/delete/post",
        { postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post deleted 🗑️");
      setPosts(posts.filter((p) => p._id !== postId));
      setShowMenu(null);
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  const handleEditProfile = async () => {
    try {
      await axios.put(
        "https://timocombackend.vercel.app/api/v1/users/update",
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setShowEditModal(false);
      fetchProfile(); // refresh data
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

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

        .profile-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        /* Sticky Header */
        .profile-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          padding: 25px 20px;
          display: flex;
          align-items: center;
          gap: 25px;
          flex-wrap: wrap;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #198754, #146c43);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          font-weight: bold;
          color: white;
          position: relative;
          flex-shrink: 0;
        }

        .profile-avatar::after {
          content: '';
          position: absolute;
          bottom: 6px;
          right: 6px;
          width: 20px;
          height: 20px;
          background: #22c55e;
          border: 3px solid white;
          border-radius: 50%;
        }

        .profile-info h2 {
          margin: 0 0 5px 0;
          font-size: 26px;
          font-weight: 700;
        }

        .profile-info p {
          margin: 0 0 8px 0;
          color: #64748b;
        }

        .edit-btn {
          background: linear-gradient(135deg, #198754, #146c43);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
        }

        /* My Posts Section */
        .my-posts-section {
          padding: 30px 20px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 25px;
          padding-bottom: 12px;
          border-bottom: 3px solid #198754;
          display: inline-block;
        }

        .post-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
          gap: 20px;
        }

        .post-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          position: relative;
        }

        .post-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .post-body {
          padding: 20px;
        }

        .post-body h6 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .post-body p {
          color: #64748b;
          font-size: 14px;
        }

        /* 3-Dot Menu */
        .menu-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255,255,255,0.9);
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 20px;
        }

        .menu-dropdown {
          position: absolute;
          top: 55px;
          right: 15px;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border-radius: 8px;
          overflow: hidden;
          z-index: 10;
        }

        .menu-item {
          padding: 12px 20px;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          color: #ef4444;
          font-weight: 500;
        }

        .menu-item:hover {
          background: #fee2e2;
        }

        .empty {
          text-align: center;
          padding: 80px 20px;
          color: #94a3b8;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            padding: 20px 15px;
          }
          .post-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="profile-page">

        {/* Sticky Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </div>

          <div className="profile-info">
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.email}</p>
            <button className="edit-btn" onClick={() => setShowEditModal(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* My Posts Section */}
        <div className="my-posts-section">
          <h4 className="section-title">My Posts</h4>

          {posts.length === 0 ? (
            <p className="empty">You haven't posted anything yet</p>
          ) : (
            <div className="post-grid">
              {posts.map((post) => (
                <div className="post-card" key={post._id}>
                  {post.postImage && (
                    <img src={post.postImage} alt={post.postTitle} />
                  )}
                  <div className="post-body">
                    <h6>{post.postTitle}</h6>
                    <p>{post.postContent?.slice(0, 120)}...</p>
                  </div>

                  {/* 3-Dot Menu */}
                  <button className="menu-btn" onClick={() => setShowMenu(showMenu === post._id ? null : post._id)}>
                    ⋮
                  </button>

                  {showMenu === post._id && (
                    <div className="menu-dropdown">
                      <button className="menu-item" onClick={() => handleDeletePost(post._id)}>
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-content" style={{
            background: 'white', padding: '30px', borderRadius: '16px',
            width: '90%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h4>Edit Profile</h4>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="First Name"
              value={editForm.firstName}
              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Last Name"
              value={editForm.lastName}
              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Bio"
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            />
            <div className="d-flex gap-3">
              <button className="btn btn-success w-100" onClick={handleEditProfile}>
                Save Changes
              </button>
              <button className="btn btn-secondary w-100" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Profile;