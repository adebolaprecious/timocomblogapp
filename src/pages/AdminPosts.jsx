import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);           // All posts from API
  const [filteredPosts, setFilteredPosts] = useState([]); // Posts after search
  const [searchQuery, setSearchQuery] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPostForDelete, setSelectedPostForDelete] = useState(null);
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
      setFilteredPosts(data.posts || []);   // Initialize filtered posts
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // Search Handler
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);

    if (!query) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) =>
      post.postTitle?.toLowerCase().includes(query) ||
      post.postContent?.toLowerCase().includes(query) ||
      post.postCategory?.toLowerCase().includes(query)
    );

    setFilteredPosts(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredPosts(posts);
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (post) => {
    setSelectedPostForDelete(post);
    setDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!selectedPostForDelete) return;

    try {
      await axios.delete(
        `https://timocombackend.vercel.app/api/v1/posts/admin/post/${selectedPostForDelete._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post deleted successfully");
      fetchPosts(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete post");
    } finally {
      setDeleteModal(false);
      setSelectedPostForDelete(null);
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

  // Calculate stats (based on original posts, not filtered)
  const totalPosts = posts.length;
  const today = new Date().toISOString().split('T')[0];
  const postsToday = posts.filter(post => 
    post.createdAt?.split('T')[0] === today
  ).length;

  // Full Screen Nice Loading State
    if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div 
            className="spinner-border text-success" 
            style={{ 
              width: '65px', 
              height: '65px',
              borderWidth: '6px'
            }} 
            role="status"
          />
          
          <h4 style={{ 
            marginTop: '25px', 
            marginBottom: '8px',
            color: '#198754',
            fontWeight: '600'
          }}>
            Fetching all posts on Admin Dashboard....
          </h4>
          
          <p style={{ 
            color: '#64748b', 
            margin: 0,
            fontSize: '15px'
          }}>
            Please wait while we fetch all posts....
          </p>
        </div>
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

        .admin-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          padding: 20px 25px;
        }

        .search-container {
          margin-top: 15px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 12px 20px 12px 45px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 15px;
        }

        .search-input:focus {
          outline: none;
          border-color: #198754;
          box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.15);
        }

        .stats-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 15px;
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

        .delete-btn { background: #ef4444; color: white; }
        .edit-btn { background: #3b82f6; color: white; }

        /* Modals */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-box, .delete-modal-box {
          background: white;
          padding: 30px;
          border-radius: 16px;
          width: 90%;
          max-width: 420px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .delete-modal-box {
          text-align: center;
          padding: 35px 30px;
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

        {/* Sticky Header with Stats + Search */}
        <div className="admin-header">
          <h3 className="dashboard-title mb-3">Admin Dashboard</h3>
          
          {/* Search Bar */}
          <div className="search-container">
            <i 
              className="bi bi-search position-absolute" 
              style={{ left: '18px', top: '14px', color: '#6c757d', fontSize: '18px' }}
            ></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search by title, content or category..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button 
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}
          </div>

          {/* Stats */}
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
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
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
                    <button 
                      className="admin-btn delete-btn" 
                      onClick={() => openDeleteModal(post)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3"></i>
              <h5>No posts found matching your search</h5>
              <p className="text-muted">Try different keywords</p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h4 className="mb-3">Edit Post Title</h4>
              <input
                type="text"
                className="form-control mb-4"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new title"
              />
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-secondary w-100" 
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-success w-100" 
                  onClick={updatePost}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && selectedPostForDelete && (
          <div className="modal-overlay">
            <div className="delete-modal-box">
              <div className="mb-4">
                <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '3.5rem' }}></i>
              </div>
              <h4 className="mb-2 text-danger">Delete Post?</h4>
              <p className="text-muted mb-4">
                Are you sure you want to delete this post?<br />
                <strong>"{selectedPostForDelete.postTitle}"</strong><br />
                This action cannot be undone.
              </p>
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-secondary w-100 py-2" 
                  onClick={() => {
                    setDeleteModal(false);
                    setSelectedPostForDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger w-100 py-2" 
                  onClick={confirmDelete}
                >
                  Yes, Delete Post
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