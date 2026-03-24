import { useEffect, useState } from "react";
import axios from "axios";
import "./library.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Library = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH SAVED POSTS
  const fetchSavedPosts = async () => {
    try {
      const res = await axios.get(
        "https://timocombackend.vercel.app/api/v1/posts/saved/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSavedPosts(res.data.posts || []);
    } catch (err) {
      toast.error("Failed to load saved posts ❌");
    } finally {
      setLoading(false);
    }
  };

  // FETCH RESPONSES
  const fetchResponses = async () => {
    try {
      const res = await axios.get(
        "https://timocombackend.vercel.app/api/v1/posts/responses/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResponses(res.data || []);
    } catch (err) {
      toast.error("Failed to load responses ❌");
    }
  };

  // REMOVE BOOKMARK
  const removeBookmark = async (postId) => {
    try {
      await axios.delete(
        `https://timocombackend.vercel.app/api/v1/posts/saved/:postId/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Removed from library 🗑️");

      // update UI instantly
      setSavedPosts((prev) =>
        prev.filter((post) => post._id !== postId)
      );
    } catch (err) {
      toast.error("Failed to remove ❌");
    }
  };

  useEffect(() => {
    fetchSavedPosts();
    fetchResponses();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div className="library-page">

      {/* HEADER */}
      <div className="library-header">
        <h2>📚 My Library</h2>
        <p className="username">
          {localStorage.getItem("name") || "Your Reading Space"}
        </p>
      </div>

      <div className="library-container">

        {/* SIDEBAR */}
        <aside className="library-sidebar">

          <button
            className={`library-nav ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            📖 Reading List
          </button>

          <button
            className={`library-nav ${activeTab === "responses" ? "active" : ""}`}
            onClick={() => setActiveTab("responses")}
          >
            💬 Responses
          </button>

        </aside>

        {/* MAIN */}
        <main className="library-content">

          {/* SAVED POSTS */}
          {activeTab === "list" &&
            (savedPosts.length === 0 ? (
              <p className="empty">No bookmarked posts yet</p>
            ) : (
              savedPosts.map((post) => (
                <div key={post._id} className="library-card">

                  <div className="library-card-text">
                    <h5>{post.postTitle}</h5>
                    <p>{post.postContent.slice(0, 120)}...</p>

                    <button
                      className="remove-btn"
                      onClick={() => removeBookmark(post._id)}
                    >
                      Remove
                    </button>
                  </div>

                  {post.postImage && (
                    <img
                      src={post.postImage}
                      alt=""
                      className="library-card-img"
                    />
                  )}
                </div>
              ))
            ))}

          {/* RESPONSES */}
          {activeTab === "responses" &&
            (responses.length === 0 ? (
              <p className="empty">No responses yet</p>
            ) : (
              responses.map((c, i) => (
                <div key={i} className="response-card">
                  <h6>{c.postTitle}</h6>
                  <p>{c.comment}</p>
                  <small>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            ))}

        </main>
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Library;