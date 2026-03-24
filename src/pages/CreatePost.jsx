import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Createposts.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postCategory, setPostCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // AUTO RESIZE TEXTAREA
  const handleContent = (e) => {
    setPostContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // IMAGE UPLOAD
  const handleImage = (file) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const reader = new FileReader();
    reader.onloadend = () => setPostImage(reader.result);
    reader.readAsDataURL(file);
  };

  // DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const sendPost = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "https://timocombackend.vercel.app/api/v1/posts/createPost",
        { postTitle, postContent, postCategory, postImage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setShowSuccess(true);

        setTimeout(() => {
          navigate("/home");
        }, 2500);
      }
    } catch (err) {
      toast.error("❌ Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-page">

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="success-modal">
          <div className="success-box">
            <div className="checkmark">✔</div>
            <h3>Post Created!</h3>
            <p>Your post was published successfully 🎉</p>
          </div>
        </div>
      )}

      <div className="post-container">

        <div className="post-header">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h3>Create Post</h3>
        </div>

        <div className="post-card">

          {/* CATEGORY */}
          <div className="category-box">
            {["general", "Technology", "Sport", "Political discussion"].map((cat) => (
              <button
                key={cat}
                className={`category-btn ${postCategory === cat ? "active" : ""}`}
                onClick={() => setPostCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* TITLE */}
          <input
            type="text"
            className="post-title"
            placeholder="Write a powerful title..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />

          {/* CONTENT */}
          <textarea
            className="post-content"
            placeholder="Start writing your story..."
            value={postContent}
            onChange={handleContent}
          />

          {/* IMAGE UPLOAD */}
          <div
            className="upload-area"
            onClick={() => fileRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {!imagePreview ? (
              <p>📸 Drag & drop or click to upload</p>
            ) : (
              <div className="image-preview-box">
                <img src={imagePreview} />
                <button
                  className="remove-img"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                    setPostImage("");
                  }}
                >
                  ✖
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => handleImage(e.target.files[0])}
          />

          {/* SUBMIT */}
          <button
            className="submit-post-btn"
            disabled={!postTitle || !postContent || isLoading}
            onClick={sendPost}
          >
            {isLoading ? "Publishing..." : "🚀 Publish Post"}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreatePost;