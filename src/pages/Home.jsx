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
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser(user);
        fetchPosts();
        
        // Sample notifications (remove these when you have real ones)
        setNotifications([
            { id: 1, text: "John liked your post", time: "5 min ago", read: false, type: "like" },
            { id: 2, text: "New comment on your post", time: "1 hour ago", read: false, type: "comment" },
            { id: 3, text: "Your post was shared", time: "3 hours ago", read: true, type: "share" },
        ]);
        setUnreadCount(2);
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                "https://timocombackend.vercel.app/api/v1/posts/getAllPosts",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            if (error.response?.status === 401) {
                console.log("Unauthorized - clearing session");
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
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setSearchResults(response.data.posts);
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
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            
            // Update posts state
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
            
            // Add notification for like (frontend only)
            if (response.data.isLiked) {
                const newNotification = {
                    id: Date.now(),
                    text: `You liked a post`,
                    time: 'Just now',
                    read: false,
                    type: 'like'
                };
                setNotifications(prev => [newNotification, ...prev]);
                setUnreadCount(prev => prev + 1);
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
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // Add notification for save
            if (res.data.saved) {
                const newNotification = {
                    id: Date.now(),
                    text: `Post saved to library`,
                    time: 'Just now',
                    read: false,
                    type: 'save'
                };
                setNotifications(prev => [newNotification, ...prev]);
                setUnreadCount(prev => prev + 1);
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

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === notificationId
                    ? { ...notif, read: true }
                    : notif
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
        setUnreadCount(0);
        toast.info('All notifications marked as read');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
               body {
                    margin: 70px;
                    overflow-x: hidden;
                    margin-left: -70px;
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
                .post-card {
                    transition: transform 0.2s;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                .post-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                .notification-badge {
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translate(25%, -25%);
                }
                .notification-dropdown {
                    max-height: 400px;
                    overflow-y: auto;
                }
                .notification-item {
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .notification-item:hover {
                    background: #f8f9fa;
                }
                .notification-unread {
                    background-color: rgba(25, 135, 84, 0.1);
                }

            `}</style>

            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
                <div className="container">
                    <div className="d-flex align-items-center gap-3">
                        <button 
                            className="btn btn-link p-0 text-dark" 
                            onClick={() => setShowOffcanvas(true)}
                        >
                            <i className="bi bi-list fs-2"></i>
                        </button>
<div className="d-flex align-items-center gap-2">
    <div className="d-flex align-items-center justify-content-center"
         style={{ 
             width: 36, 
             height: 36, 
             borderRadius: 12,
             background: 'linear-gradient(135deg, #198754, #146c43)',
             boxShadow: '0 4px 10px rgba(25, 135, 84, 0.3)'
         }}>
        <span style={{ 
            fontSize: '22px', 
            fontWeight: 'bold', 
            color: 'white',
            fontFamily: 'Arial Black, sans-serif',
            transform: 'scale(1.1)'
        }}>T</span>
    </div>
    <span className="timocom-text">TIMOCOM</span>
</div>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="d-none d-md-block flex-grow-1 mx-4">
                        <form onSubmit={handleSearch} className="position-relative">
                            <input
                                type="text"
                                className="form-control search-box ps-4"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="btn position-absolute end-0 top-50 translate-middle-y border-0"
                            >
                                {isSearching ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    <i className="bi bi-search"></i>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right side buttons */}
                    <div className="d-flex align-items-center gap-2">
                        <button 
                            className="btn btn-success rounded-pill px-4 d-flex align-items-center gap-2"
                            onClick={() => navigate('/createpost')}
                        >
                            <i className="bi bi-pencil-square"></i>
                            <span className="d-none d-sm-inline">Write</span>
                        </button>
                        
                        <div className="position-relative">
                            <button 
                                className="btn btn-link p-2 text-dark position-relative"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <i className="bi bi-bell fs-5"></i>
                                {unreadCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            
                            {showNotifications && (
                                <div className="position-absolute end-0 mt-2 bg-white shadow-lg rounded-3 p-3 notification-dropdown" style={{ width: '320px', zIndex: 1000 }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold mb-0">Notifications</h6>
                                        {unreadCount > 0 && (
                                            <button 
                                                className="btn btn-sm btn-link text-success text-decoration-none p-0"
                                                onClick={markAllAsRead}
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    {notifications.length === 0 ? (
                                        <p className="text-muted text-center small mb-0">No notifications yet</p>
                                    ) : (
                                        notifications.map(notif => (
                                            <div 
                                                key={notif.id} 
                                                className={`d-flex align-items-start gap-2 mb-2 p-2 rounded-3 notification-item ${!notif.read ? 'notification-unread' : ''}`}
                                                onClick={() => markAsRead(notif.id)}
                                            >
                                                <i className={`bi ${
                                                    notif.type === 'like' ? 'bi-heart-fill text-danger' : 
                                                    notif.type === 'comment' ? 'bi-chat-fill text-primary' : 
                                                    'bi-bookmark-fill text-success'
                                                } mt-1`}></i>
                                                <div className="flex-grow-1">
                                                    <p className="mb-0 small">{notif.text}</p>
                                                    <small className="text-muted">{notif.time}</small>
                                                </div>
                                                {!notif.read && <span className="badge bg-success rounded-pill" style={{ width: '8px', height: '8px', padding: 0 }}></span>}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="container d-md-none mt-2">
                    <form onSubmit={handleSearch} className="position-relative">
                        <input
                            type="text"
                            className="form-control search-box ps-4"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn position-absolute end-0 top-50 translate-middle-y border-0">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </nav>

            {/* Offcanvas Menu */}
            <div className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`} style={{ visibility: showOffcanvas ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header border-bottom">
                    <h5 className="timocom-text mb-0">TIMOCOM</h5>
                    <button type="button" className="btn-close" onClick={() => setShowOffcanvas(false)}></button>
                </div>
                <div className="list-group list-group-flush">
                    <div> 
                        <button
                            className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
                            onClick={() => navigate('/home')}
                        >
                            <i className="bi bi-house-door fs-5 text-success"></i>
                            <span className="fw-medium">Home</span>
                        </button>
                        <button
                            className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
                            onClick={() => navigate('/library')}
                        >
                            <i className="bi bi-collection fs-5 text-success"></i>
                            <span className="fw-medium">Library</span>
                        </button>
                        <button
                            className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
                            onClick={() => navigate('/profile')}
                        >
                            <i className="bi bi-person-circle fs-5 text-success"></i>
                            <span className="fw-medium">Profile</span>
                        </button>
                        {currentUser?.role === "admin" && (
                            <button
                                className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
                                onClick={() => navigate('/admin/posts')}
                            >
                                <i className="bi bi-shield-lock fs-5 text-danger"></i>
                                <span className="fw-medium">Admin Panel</span>
                            </button>
                        )}
                        {currentUser?.role === "admin" && (
                            <button
                                className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
                                onClick={() => navigate('/admin/users')}
                            >
                                <i className="bi bi-shield-lock fs-5 text-danger"></i>
                                <span className="fw-medium">Manage users</span>
                            </button>
                        )}
                    </div> 
                    
                    <div className="border-top mt-4 pt-4 px-3">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=198754&color=fff&size=40`}
                                alt="profile"
                                className="rounded-circle"
                            />
                            <div>
                                <p className="mb-0 fw-bold">{currentUser?.name || 'User'}</p>
                                <small className="text-muted">{currentUser?.email || ''}</small>
                            </div>
                        </div>
                        <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {showOffcanvas && (
                <div className="offcanvas-backdrop fade show position-fixed top-0 start-0 w-100 h-100" onClick={() => setShowOffcanvas(false)} style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
            )}

            {/* Main Content */}
            <div className="container py-4">
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
                                setNotifications={setNotifications}
                                setUnreadCount={setUnreadCount}
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
                                    setNotifications={setNotifications}
                                    setUnreadCount={setUnreadCount}
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

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

// Post Card Component
const PostCard = ({ post, handleLike, handleSavePost, currentUser, setNotifications, setUnreadCount }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [localComments, setLocalComments] = useState(post.comments || []);
    const [expanded, setExpanded] = useState(false);
    const [saved, setSaved] = useState(
        post.savedBy?.includes(currentUser?.id || currentUser?._id)
    );
    
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
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            
            if (response.data.success) {
                const newComment = {
                    userId: currentUser?.id,
                    userName: currentUser?.name || 'User',
                    comment: commentText,
                    createdAt: new Date()
                };
                
                setLocalComments([...localComments, newComment]);
                setCommentText('');
                
                // Add notification for comment
                const newNotification = {
                    id: Date.now(),
                    text: `You commented on "${post.postTitle.slice(0, 30)}..."`,
                    time: 'Just now',
                    read: false,
                    type: 'comment'
                };
                setNotifications(prev => [newNotification, ...prev]);
                setUnreadCount(prev => prev + 1);
                
                toast.success('Comment added!');
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const isLiked = post.likes?.includes(currentUser?._id);
    
    return (
        <div className="card post-card mb-4">
            {post.postImage && (
                <img src={post.postImage} className="card-img-top" alt={post.postTitle}
                    style={{ maxHeight: '400px', objectFit: 'cover' }} />
            )}
            <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <img src={`https://ui-avatars.com/api/?name=${post.authorName}&background=198754&color=fff&size=32`}
                        alt={post.authorName} className="rounded-circle" width="32" height="32" />
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
                            {expanded ? "Show less" : "...Read more"}
                        </span>
                    )}
                </p>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <div className="d-flex gap-2">
                        <button className={`btn btn-sm ${isLiked ? 'btn-success' : 'btn-outline-success'} rounded-pill px-3`}
                            onClick={() => handleLike(post._id)}>
                            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
                            {post.likes?.length || 0}
                        </button>
                        
                        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                            onClick={() => setShowComments(!showComments)}>
                            <i className="bi bi-chat me-1"></i>
                            {localComments.length}
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
                            <input type="text" className="form-control form-control-sm"
                                placeholder="Add a comment..." value={commentText}
                                onChange={(e) => setCommentText(e.target.value)} />
                            <button className="btn btn-success btn-sm" onClick={handleAddComment}>
                                Comment 
                            </button>
                        </div>
                        
                        {localComments.map((comment, idx) => (
                            <div key={idx} className="d-flex gap-2 mb-2">
                                <img src={`https://ui-avatars.com/api/?name=${comment.userName || 'U'}&background=198754&color=fff&size=24`}
                                    alt="user" className="rounded-circle" width="24" height="24" />
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