import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load post
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = posts.find(p => p.id === parseInt(postId));
    setPost(foundPost);
    setComments(foundPost?.comments || []);
    
    // Load current user
    const user = JSON.parse(localStorage.getItem("currentUser")) || null;
    setCurrentUser(user);
  }, [postId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      content: newComment,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      time: new Date().toLocaleTimeString()
    };

    const updatedComments = [...comments, comment];
    
    // Update post in localStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map(p => {
      if (p.id === parseInt(postId)) {
        return { ...p, comments: updatedComments };
      }
      return p;
    });
    
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setComments(updatedComments);
    setNewComment("");
  };

  if (!post) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-4">
      {/* Post content */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Author info */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
              <span className="text-white h5 mb-0">{post.authorName?.charAt(0)}</span>
            </div>
            <div>
              <Link to={`/profile/${post.authorId}`} className="text-dark text-decoration-none fw-bold">
                {post.authorName}
              </Link>
              <div className="text-secondary small">
                {post.date} · {post.reads || "2"} min read
              </div>
            </div>
          </div>

          {/* Post title and content */}
          <h1 className="display-6 fw-bold mb-4">{post.title}</h1>
          <div className="mb-5">
            <p className="lead">{post.excerpt}</p>
            <p>{post.content}</p>
          </div>

          {/* Comments section */}
          <div className="border-top pt-4">
            <h3 className="h5 fw-bold mb-4">
              Comments ({comments.length})
            </h3>

            {/* Add comment form */}
            {currentUser ? (
              <form onSubmit={handleAddComment} className="mb-4">
                <div className="d-flex gap-2">
                  <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "32px", height: "32px" }}>
                    <span className="text-white small">{currentUser.name?.charAt(0)}</span>
                  </div>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control form-control-sm mb-2"
                      rows="2"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button type="submit" className="btn btn-success btn-sm">
                      Comment
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="alert alert-light mb-4">
                <Link to="/login" className="text-success">Login</Link> to leave a comment
              </div>
            )}

            {/* Comments list */}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="d-flex gap-2 mb-3">
                  <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "32px", height: "32px" }}>
                    <span className="text-white small">{comment.userName?.charAt(0)}</span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Link to={`/profile/${comment.userId}`} className="text-dark text-decoration-none fw-medium small">
                        {comment.userName}
                      </Link>
                      <span className="text-secondary small">{comment.date}</span>
                    </div>
                    <p className="small mb-2">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary small">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;