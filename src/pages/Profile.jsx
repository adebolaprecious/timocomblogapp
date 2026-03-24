import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Profile.css";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);

  const [form, setForm] = useState({
    name: "",
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

      setForm({
        name: `${loggedUser.firstName} ${loggedUser.lastName}`,
        email: loggedUser.email,
        bio: loggedUser.bio || ""
      });

      const { data } = await axios.get(
        `https://timocombackend.vercel.app/api/v1/posts/user/${loggedUser.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data.posts);
      setPosts(data.posts || []);
    } catch (err) {
      toast.error("Failed to load profile ❌");
    }
  };

  // DELETE POST
  const handleDeletePost = async (postId) => {
    try {
      await axios.post(
        "https://timocombackend.vercel.app/api/v1/posts/delete/post",
        { postId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Post deleted 🗑️");
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-avatar">
          {user.firstName?.[0]}
          {user.lastName?.[0]}
        </div>

        <div className="profile-info">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.email}</p>
          <span>{user.bio || "Active"}</span>

          <button
            className="edit-btn"
            onClick={() => setEditingProfile(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* POSTS */}
      <h4 className="post-title">My Posts</h4>

      {posts.length === 0 ? (
        <p className="empty">No posts yet</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              {post.postImage && (
                <img src={post.postImage} alt={post.postTitle} />
              )}

              <div className="post-body">
                <h6>{post.postTitle}</h6>
                <p>{post.postContent.slice(0, 80)}...</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
  
            <style>{`
           /* Profile.css - Scoped styles for Profile component only */

.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  margin-right: 360px;
  margin-top: 20px;
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f3 100%);
}

/* Profile Header */
.profile-header {
  display: flex;
  gap: 40px;
  align-items: center;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* Avatar */
.profile-avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #198754, #146c43);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  box-shadow: 0 8px 20px rgba(25, 135, 84, 0.2);
  flex-shrink: 0;
}

/* Profile Info */
.profile-info {
  flex: 1;
}

.profile-info h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.profile-info p {
  color: #64748b;
  margin-bottom: 12px;
  font-size: 16px;
}

.profile-info span {
  display: inline-block;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #475569;
  margin-bottom: 16px;
}

/* Edit Button */
.edit-btn {
  background: linear-gradient(135deg, #198754, #146c43);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(25, 135, 84, 0.3);
}

/* Posts Title */
.post-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid #198754;
  display: inline-block;
}

/* Empty State */
.empty {
  text-align: center;
  color: #94a3b8;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  font-size: 16px;
}

/* Post Grid */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

/* Post Card */
.post-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Post Image */
.post-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Post Body */
.post-body {
  padding: 20px;
}

.post-body h6 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
  line-height: 1.4;
}

.post-body p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 16px;
}

/* Delete Button */
.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.delete-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Loading State (if you add it) */
.profile-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f3 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-page {
    padding: 20px 15px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
    gap: 20px;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }

  .profile-info h2 {
    font-size: 24px;
  }

  .post-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .post-title {
    font-size: 20px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
             `}</style>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Profile;