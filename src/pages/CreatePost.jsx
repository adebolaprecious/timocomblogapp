import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postCategory, setPostCategory] = useState("general, Technology, sport, political discussion");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleContent = (e) => {
    setPostContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // Image Upload
  const handleImage = (file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const reader = new FileReader();
    reader.onloadend = () => setPostImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const sendPost = async () => {
    if (!postTitle || !postContent) {
      toast.error("Title and content are required");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "https://timocombackend.vercel.app/api/v1/posts/createPost",
        { postTitle, postContent, postCategory, postImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setShowSuccess(true);
        toast.success("Post published successfully! 🎉");

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100vh !important;
          overflow-x: hidden !important;
        }

        .create-post-page {
          width: 100%;
          min-height: 100vh;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .post-container {
          width: 100%;
          max-width: 780px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .post-header {
          padding: 20px 30px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .back-btn-success {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #198754;
        }

        .post-card {
          padding: 30px;
        }

        /* Fix for Title and Content - Make text always visible */
        .post-title {
          width: 100%;
          border: none;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          outline: none;
          color: #1e293b !important;           /* Force dark color */
          background: transparent !important;
        }

        .post-content {
          width: 100%;
          min-height: 320px;
          border: none;
          font-size: 17px;
          line-height: 1.7;
          resize: none;
          outline: none;
          margin-bottom: 30px;
          color: #1e293b !important;           /* Force dark color */
          background: transparent !important;
        }

        /* Category */
        .category-box {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }

        .category-btn {
          padding: 8px 18px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 30px;
          font-size: 14px;
          cursor: pointer;
        }

        .category-btn.active {
          background: #198754;
          color: white;
          border-color: #198754;
        }

        /* Image Upload */
        .upload-area {
          border: 2px dashed #ddd;
          border-radius: 12px;
          padding: 50px 20px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 30px;
        }

        .upload-area:hover {
          border-color: #198754;
          background: #f8fff8;
        }

        .image-preview-box {
          position: relative;
          display: inline-block;
        }

        .image-preview-box img {
          max-width: 100%;
          border-radius: 12px;
        }

        .remove-img {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ef4444;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
        }

        /* Publish Button - Left Side */
        .submit-post-btn {
          background: #198754;
          color: white;
          border: none;
          padding: 14px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          float: left;
        }

        .submit-post-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Success Modal */
        .success-modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .success-box {
          background: white;
          padding: 40px 50px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .checkmark {
          font-size: 60px;
          color: #198754;
          margin-bottom: 15px;
        }

        @media (max-width: 768px) {
          .post-card {
            padding: 20px 15px;
          }
          .post-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="create-post-page">
        <div className="post-container">
          {/* Header */}
          <div className="post-header">
            <button className="back-btn-success" onClick={() => navigate(-1)}>
              ←
            </button>
            <h3 style={{ margin: 0, fontWeight: 600 }}>Create Post</h3>
          </div>

          <div className="post-card">
            {/* Category */}
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

            {/* Title - Fixed text color */}
            <input
              type="text"
              className="post-title"
              placeholder="Write a powerful title..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />

            {/* Content - Fixed text color */}
            <textarea
              className="post-content"
              placeholder="Start writing your story..."
              value={postContent}
              onChange={handleContent}
            />

            {/* Image Upload */}
            <div
              className="upload-area"
              onClick={() => fileRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {!imagePreview ? (
                <p>📸 Drag & drop or click to upload image</p>
              ) : (
                <div className="image-preview-box">
                  <img src={imagePreview} alt="preview" />
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

            {/* Publish Button - Left Side (Medium Style) */}
            <button
              className="submit-post-btn"
              onClick={sendPost}
              disabled={!postTitle || !postContent || isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="success-modal">
            <div className="success-box">
              <div className="checkmark">✔</div>
              <h3>Post Published!</h3>
              <p>Your story is now live 🎉</p>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default CreatePost;