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
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
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
        `https://timocombackend.vercel.app/api/v1/posts/saved/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Removed from library 🗑️");
      setSavedPosts((prev) => prev.filter((post) => post._id !== postId));
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
            Loading Library....
          </h4>
          
          <p style={{ 
            color: '#64748b', 
            margin: 0,
            fontSize: '15px'
          }}>
            Please wait while we fetch all posts on Library...
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

        .library-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #e6f4ea, #f4fbf6);
        }

        /* Sticky Top Navigation */
        .library-top-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 15px 20px;
          display: flex;
          gap: 20px;
          border-bottom: 1px solid #eee;
        }

        .library-tab {
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 600;
          background: none;
          border: none;
          color: #555;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .library-tab.active {
          background: #198754;
          color: white;
        }

        /* Main Content */
        .library-content {
          padding: 20px;
          max-width: 100%;
        }

        .library-card {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 18px;
          margin-bottom: 20px;
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          transition: 0.3s;
        }

        .library-card:hover {
          transform: translateY(-4px);
        }

        .library-card-text h5 {
          font-weight: 700;
          margin-bottom: 8px;
        }

        .library-card-text p {
          color: #555;
          font-size: 14px;
        }

        .library-card-img {
          width: 120px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .response-card {
          background: white;
          padding: 18px;
          border-radius: 12px;
          margin-bottom: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }

        .empty {
          text-align: center;
          color: #777;
          margin-top: 60px;
          font-size: 18px;
        }

        .remove-btn {
          margin-top: 10px;
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
        }

        .remove-btn:hover {
          background: #dc2626;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .library-top-nav {
            padding: 12px 15px;
            gap: 10px;
          }
          .library-tab {
            padding: 8px 16px;
            font-size: 15px;
          }
          .library-card {
            flex-direction: column;
          }
          .library-card-img {
            width: 100%;
            height: 180px;
          }
          .library-content {
            padding: 15px 12px;
          }
        }
      `}</style>

      <div className="library-page">

        {/* Sticky Top Navigation */}
        <div className="library-top-nav">
          <button
            className={`library-tab ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            📖 Reading List
          </button>
          <button
            className={`library-tab ${activeTab === "responses" ? "active" : ""}`}
            onClick={() => setActiveTab("responses")}
          >
            💬 My Responses
          </button>
        </div>

        {/* Main Content */}
        <div className="library-content">
          {activeTab === "list" && (
            savedPosts.length === 0 ? (
              <p className="empty">No bookmarked posts yet</p>
            ) : (
              savedPosts.map((post) => (
                <div key={post._id} className="library-card">
                  <div className="library-card-text">
                    <h5>{post.postTitle}</h5>
                    <p>{post.postContent.slice(0, 120)}...</p>
                    <button className="remove-btn" onClick={() => removeBookmark(post._id)}>
                      Remove
                    </button>
                  </div>
                  {post.postImage && (
                    <img src={post.postImage} alt="" className="library-card-img" />
                  )}
                </div>
              ))
            )
          )}

          {activeTab === "responses" && (
            responses.length === 0 ? (
              <p className="empty">No responses yet</p>
            ) : (
              responses.map((c, i) => (
                <div key={i} className="response-card">
                  <h6>{c.postTitle}</h6>
                  <p>{c.comment}</p>
                  <small>{new Date(c.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            )
          )}
        </div>

        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};

export default Library;