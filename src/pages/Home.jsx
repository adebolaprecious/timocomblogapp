import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser(user);
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                "https://timocombackend.vercel.app/api/v1/posts/getAllPosts",
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `https://timocombackend.vercel.app/api/v1/posts/search?q=${searchQuery}`,
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            setSearchResults(response.data.posts || []);
        } catch (error) {
            console.error("Error searching posts:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `https://timocombackend.vercel.app/api/v1/posts/${postId}/like`,
                {},
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            likes: response.data.isLiked
                                ? [...(post.likes || []), currentUser?._id]
                                : (post.likes || []).filter(id => id !== currentUser?._id)
                        }
                        : post
                )
            );
            if (response.data.isLiked) {
                toast.success('Post liked!');
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleSavePost = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `https://timocombackend.vercel.app/api/v1/posts/${postId}/save`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.saved) {
                toast.success('Post saved to library!');
            }
            return res.data.saved;
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

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
            Loading Home
          </h4>
          
          <p style={{ 
            color: '#64748b', 
            margin: 0,
            fontSize: '15px'
          }}>
            Please wait while we fetch all posts...
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

                .home-page {
                    width: 100%;
                    min-height: 100vh;
                }

                .main-content {
                    padding-top: 90px;   /* Adjusted for sticky navbar */
                }

                .post-card {
                    margin-bottom: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }

                .timocom-text {
                    font-family: 'Arial Black', sans-serif;
                    font-weight: 900;
                    font-size: 1.8rem;
                    background: linear-gradient(45deg, #198754, #146c43);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .search-box {
                    border-radius: 20px;
                    border: 1px solid #dee2e6;
                }

                /* Offcanvas Fixes */
                .offcanvas {
                    z-index: 1060 !important;
                    width: 280px !important;
                }

                .offcanvas-backdrop {
                    z-index: 1055 !important;
                }

                @media (max-width: 768px) {
                    .main-content {
                        padding-top: 130px; /* Extra space for mobile navbar + search */
                    }
                }
            `}</style>

            <div className="home-page">
                {/* Sticky Navbar - Stays fixed while scrolling */}
                <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
                    <div className="container-fluid px-3 px-lg-4">
                        <div className="d-flex align-items-center gap-3">
                            <button 
                                className="btn btn-link p-0 text-dark" 
                                onClick={() => setShowOffcanvas(true)}
                            >
                                <i className="bi bi-list fs-2"></i>
                            </button>
                            <div className="d-flex align-items-center gap-2">
                                <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #198754, #146c43)' }}>
                                    <span style={{ fontSize: '22px', fontWeight: 'bold', color: 'white' }}>T</span>
                                </div>
                                <span className="timocom-text">TIMOCOM</span>
                            </div>
                        </div>

                        {/* Desktop Search */}
                        <div className="d-none d-md-block flex-grow-1 mx-4">
                            <form onSubmit={handleSearch} className="position-relative">
                                <input
                                    type="text"
                                    className="form-control search-box ps-4"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn position-absolute end-0 top-50 translate-middle-y border-0">
                                    {isSearching ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    ) : (
                                        <i className="bi bi-search"></i>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Right Side - Write + Profile */}
                        <div className="d-flex align-items-center gap-2">
                            <button 
                                className="btn btn-success rounded-pill px-4 d-flex align-items-center gap-2" 
                                onClick={() => navigate('/createpost')}
                            >
                                <i className="bi bi-pencil-square"></i>
                                <span className="d-none d-sm-inline">Write</span>
                            </button>

                            {/* Profile Icon - Now routes to Profile Page */}
                            <button 
                                className="btn btn-link p-2 text-dark" 
                                onClick={() => navigate('/profile')}
                                title="Go to Profile"
                            >
                                <i className="bi bi-person-circle fs-4"></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="container d-md-none mt-2 px-3 pb-2">
                        <form onSubmit={handleSearch} className="position-relative">
                            <input 
                                type="text" 
                                className="form-control search-box ps-4" 
                                placeholder="Search posts..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                            <button type="submit" className="btn position-absolute end-0 top-50 translate-middle-y border-0">
                                {isSearching ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    <i className="bi bi-search"></i>
                                )}
                            </button>
                        </form>
                    </div>
                </nav>

                {/* Offcanvas Menu */}
                <div className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`} style={{ width: '280px', zIndex: 1060 }}>
                    <div className="offcanvas-header border-bottom">
                        <h5 className="timocom-text mb-0">TIMOCOM</h5>
                        <button type="button" className="btn-close" onClick={() => setShowOffcanvas(false)}></button>
                    </div>
                    <div className="offcanvas-body p-0 d-flex flex-column">
                        <div className="list-group list-group-flush">
                            <button className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3" 
                                    onClick={() => { navigate('/home'); setShowOffcanvas(false); }}>
                                <i className="bi bi-house-door fs-5 text-success"></i>
                                <span className="fw-medium">Home</span>
                            </button>
                            <button className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3" 
                                    onClick={() => { navigate('/library'); setShowOffcanvas(false); }}>
                                <i className="bi bi-collection fs-5 text-success"></i>
                                <span className="fw-medium">Library</span>
                            </button>
                            <button className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3" 
                                    onClick={() => { navigate('/profile'); setShowOffcanvas(false); }}>
                                <i className="bi bi-person-circle fs-5 text-success"></i>
                                <span className="fw-medium">Profile</span>
                            </button>

                            {currentUser?.role === "admin" && (
                                <button className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3" 
                                        onClick={() => { navigate('/admin/posts'); setShowOffcanvas(false); }}>
                                    <i className="bi bi-shield-lock fs-5 text-danger"></i>
                                    <span className="fw-medium">Admin Panel</span>
                                </button>
                            )}
                            {currentUser?.role === "admin" && (
                                <button className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3" 
                                        onClick={() => { navigate('/admin/users'); setShowOffcanvas(false); }}>
                                    <i className="bi bi-shield-lock fs-5 text-danger"></i>
                                    <span className="fw-medium">Manage users</span>
                                </button>
                            )}
                        </div>

                        {/* User Section at bottom */}
                        <div className="border-top mt-auto p-3">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=198754&color=fff&size=45`}
                                    alt="profile" 
                                    className="rounded-circle"
                                />
                                <div>
                                    <p className="mb-0 fw-bold">{currentUser?.name || 'User'}</p>
                                    <small className="text-muted">{currentUser?.email || ''}</small>
                                </div>
                            </div>
                            <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right"></i> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Backdrop for Offcanvas */}
                {showOffcanvas && (
                    <div 
                        className="offcanvas-backdrop fade show position-fixed top-0 start-0 w-100 h-100" 
                        onClick={() => setShowOffcanvas(false)} 
                        style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    ></div>
                )}

                {/* Main Content */}
                <div className="main-content">
                    <div className="container-fluid px-3">
                        {searchQuery && searchResults.length > 0 ? (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="fw-bold">Search Results</h4>
                                    <button className="btn btn-link text-success text-decoration-none" onClick={clearSearch}>
                                        Clear Search
                                    </button>
                                </div>
                                {searchResults.map(post => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                        handleLike={handleLike}
                                        handleSavePost={handleSavePost}
                                        currentUser={currentUser}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <h4 className="fw-bold mb-4">Latest Posts</h4>
                                {posts.length > 0 ? (
                                    posts.map(post => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            handleLike={handleLike}
                                            handleSavePost={handleSavePost}
                                            currentUser={currentUser}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="bi bi-file-text fs-1 text-muted"></i>
                                        <p className="mt-3 text-muted">No posts yet. Be the first to create one!</p>
                                        <button className="btn btn-success mt-2" onClick={() => navigate('/createpost')}>
                                            Create Post
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

// PostCard Component
const PostCard = ({ post, handleLike, handleSavePost, currentUser }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [localComments, setLocalComments] = useState(post.comments || []);
    const [expanded, setExpanded] = useState(false);
    const [saved, setSaved] = useState(post.savedBy?.includes(currentUser?.id || currentUser?._id));

    useEffect(() => {
        setLocalComments(post.comments || []);
    }, [post.comments]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `https://timocombackend.vercel.app/api/v1/posts/${post._id}/comment`,
                { comment: commentText },
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            if (response.data.success) {
                const newComment = {
                    userName: currentUser?.firstName + " " + currentUser?.lastName,
                    comment: commentText,
                    createdAt: new Date()
                };
                setLocalComments([...localComments, newComment]);
                setCommentText('');
                toast.success('Comment added!');
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const isLiked = post.likes?.includes(currentUser?._id);

    return (
        <div className="card post-card mb-4 w-100">
            {post.postImage && (
                <img 
                    src={post.postImage} 
                    className="card-img-top" 
                    alt={post.postTitle} 
                    style={{ maxHeight: '400px', objectFit: 'cover' }} 
                />
            )}
            <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${post.authorName}&background=198754&color=fff&size=32`} 
                        alt={post.authorName} 
                        className="rounded-circle" 
                        width="32" 
                        height="32" 
                    />
                    <div>
                        <h6 className="mb-0 fw-bold">{post.authorName}</h6>
                        <small className="text-muted">
                            {new Date(post.createdAt).toLocaleDateString()} • {post.postCategory}
                        </small>
                    </div>
                </div>
                <h5 className="card-title fw-bold mb-2">{post.postTitle}</h5>
                <p className="card-text text-muted">
                    {expanded ? post.postContent : post.postContent.slice(0, 150)}
                    {post.postContent.length > 150 && (
                        <span 
                            className="text-success ms-2" 
                            style={{ cursor: "pointer", fontWeight: "500" }} 
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? " Show less" : "...Read more"}
                        </span>
                    )}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <div className="d-flex gap-2">
                        <button 
                            className={`btn btn-sm ${isLiked ? 'btn-success' : 'btn-outline-success'} rounded-pill px-3`} 
                            onClick={() => handleLike(post._id)}
                        >
                            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i> 
                            {post.likes?.length || 0}
                        </button>
                        <button 
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                            onClick={() => setShowComments(!showComments)}
                        >
                            <i className="bi bi-chat me-1"></i> {localComments.length}
                        </button>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                            <i className="bi bi-share"></i>
                        </button>
                        <button 
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                            onClick={async () => {
                                const savedStatus = await handleSavePost(post._id);
                                setSaved(savedStatus);
                            }}
                        >
                            <i className={`bi ${saved ? "bi-bookmark-fill text-success" : "bi-bookmark"}`}></i>
                        </button>
                    </div>
                </div>

                {showComments && (
                    <div className="mt-3 pt-3 border-top">
                        <div className="d-flex gap-2 mb-3">
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Add a comment..." 
                                value={commentText} 
                                onChange={(e) => setCommentText(e.target.value)} 
                            />
                            <button className="btn btn-success btn-sm" onClick={handleAddComment}>
                                Comment
                            </button>
                        </div>
                        {localComments.map((comment, idx) => (
                            <div key={idx} className="d-flex gap-2 mb-2">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${comment.userName || 'U'}&background=198754&color=fff&size=24`} 
                                    alt="user" 
                                    className="rounded-circle" 
                                    width="24" 
                                    height="24" 
                                />
                                <div className="bg-light rounded-3 p-2 flex-grow-1">
                                    <small className="fw-bold d-block">{comment.userName || 'User'}</small>
                                    <small>{comment.comment || comment.text}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;