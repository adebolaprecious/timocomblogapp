import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        "https://timocombackend.vercel.app/api/v1/posts/admin/posts",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(data.posts || []);
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // Delete Post (Fixed API endpoint)
  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `https://timocombackend.vercel.app/api/v1/posts/admin/post/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post deleted successfully");
      fetchPosts(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };
  // Open Edit Modal
  const openEditModal = (post) => {
    setSelectedPost(post);
    setNewTitle(post.postTitle);
    setEditModal(true);
  };

  // Update Post Title
  const updatePost = async () => {
    if (!newTitle.trim()) return toast.error("Title cannot be empty");

    try {
      await axios.patch(
        `https://timocombackend.vercel.app/api/v1/posts/admin/updatepost/${selectedPost._id}`,
        { postTitle: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post updated successfully");
      setEditModal(false);
      fetchPosts();
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Calculate stats
  const totalPosts = posts.length;
  const today = new Date().toISOString().split('T')[0];
  const postsToday = posts.filter(post => 
    post.createdAt?.split('T')[0] === today
  ).length;

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

        .admin-page {
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

        .stats-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .stat-box {
          background: white;
          padding: 15px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          flex: 1;
          min-width: 180px;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #198754;
        }

        /* Posts Grid */
        .posts-grid {
          padding: 30px 25px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 25px;
        }

        .admin-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transition: 0.3s;
        }

        .admin-card:hover {
          transform: translateY(-6px);
        }

        .admin-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .admin-card-body {
          padding: 20px;
        }

        .category-badge {
          background: #198754;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          display: inline-block;
          margin-bottom: 10px;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .admin-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
        }

        .edit-btn {
          background: #3b82f6;
          color: white;
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
          max-width: 420px;
        }

        @media (max-width: 768px) {
          .posts-grid {
            grid-template-columns: 1fr;
            padding: 20px 15px;
          }
          .admin-header {
            padding: 15px 20px;
          }
        }
      `}</style>

      <div className="admin-page">

        {/* Sticky Header with Stats */}
        <div className="admin-header">
          <h3 className="dashboard-title">Admin Dashboard</h3>
          
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{totalPosts}</div>
              <div>Total Posts</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{postsToday}</div>
              <div>Posts Today</div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="admin-card" key={post._id}>
                {post.postImage && (
                  <img src={post.postImage} alt={post.postTitle} />
                )}
                <div className="admin-card-body">
                  <span className="category-badge">{post.postCategory || "General"}</span>
                  <h5 className="admin-title">{post.postTitle}</h5>
                  <p className="admin-text">
                    {post.postContent?.slice(0, 100)}...
                  </p>

                  <div className="admin-actions">
                    <button className="admin-btn edit-btn" onClick={() => openEditModal(post)}>
                      ✏️ Edit
                    </button>
                    <button className="admin-btn delete-btn" onClick={() => deletePost(post._id)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No posts found</p>
          )}
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h4>Edit Post Title</h4>
              <input
                type="text"
                className="form-control mb-3"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="d-flex gap-3">
                <button className="btn btn-secondary w-100" onClick={() => setEditModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success w-100" onClick={updatePost}>
                  Save Changes
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

export default AdminPosts;