import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPosts.css";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const token = localStorage.getItem("token");

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        "https://timocombackend.vercel.app/api/v1/posts/admin/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts(data.posts || []);
    } catch (err) {
      toast.error("Failed to fetch posts ❌");
    }
  };

  // DELETE
  const deletePost = async (id) => {
    try {
      await axios.delete(
        `https://timocombackend.vercel.app/api/v1/posts/admin/post/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Post deleted 🗑️");
      fetchPosts();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // OPEN MODAL
  const openEditModal = (post) => {
    setSelectedPost(post);
    setNewTitle(post.postTitle);
    setEditModal(true);
  };

  // UPDATE
  const updatePost = async () => {
    try {
      await axios.patch(
        `https://timocombackend.vercel.app/api/v1/admin/updatepost/:post/${id}`,
        { postTitle: newTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Post updated ✏️");
      setEditModal(false);
      fetchPosts();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="admin-container">
      <h3 className="dashboard-title">🚀 Admin Dashboard</h3>

      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <div className="admin-card" key={post._id}>
              {post.postImage && (
                <img src={post.postImage} alt="post" />
              )}

              <div className="admin-card-body">
                <span className="category-badge">
                  {post.postCategory || "general"}
                </span>

                <h5 className="admin-title">{post.postTitle}</h5>

                <p className="admin-text">
                  {post.postContent.slice(0, 100)}...
                </p>

                <div className="admin-actions">
                  <button
                    className="admin-btn delete-btn"
                    onClick={() => deletePost(post._id)}
                  >
                    🗑 Delete
                  </button>

                  <button
                    className="admin-btn edit-btn"
                    onClick={() => openEditModal(post)}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Edit Post</h4>

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setEditModal(false)}>
                Cancel
              </button>
              <button onClick={updatePost}>Save</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default AdminPosts;