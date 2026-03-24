import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  // return (
//     <nav
//       className={`navbar navbar-expand-lg fixed-top transition-all duration-300 ${
//         isScrolled
//           ? "bg-white shadow-md py-2"
//           : "bg-white/95 backdrop-blur-sm py-4"
//       }`}
//     >
//       <div className="container">
//         {/* Logo */}
//         <Link
//           className="navbar-brand fw-bold text-dark"
//           to="/"
//           style={{ fontSize: "1.8rem", letterSpacing: "-0.5px" }}
//         >
//           Timocom
//           <span className="text-success mx-1">•</span>
//         </Link>

//         {/* Mobile Toggle */}
//         <button
//           className="navbar-toggler border-0"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#nav"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navigation Items */}
//         <div className="collapse navbar-collapse" id="nav">
//           {/* Center - Navigation Links */}
//           <ul className="navbar-nav mx-auto gap-2">
//             <li className="nav-item">
//               <Link
//                 className={`nav-link px-3 py-2 rounded-pill transition-all ${
//                   location.pathname === "/"
//                     ? "active bg-light text-dark fw-semibold"
//                     : "text-secondary hover-bg-light"
//                 }`}
//                 to="/"
//               >
//                 Home
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link
//                 className={`nav-link px-3 py-2 rounded-pill transition-all ${
//                   location.pathname === "/posts"
//                     ? "active bg-light text-dark fw-semibold"
//                     : "text-secondary hover-bg-light"
//                 }`}
//                 to="/posts"
//               >
//                 Stories
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link
//                 className={`nav-link px-3 py-2 rounded-pill transition-all ${
//                   location.pathname === "/posts"
//                     ? "active bg-light text-dark fw-semibold"
//                     : "text-secondary hover-bg-light"
//                 }`}
//                 to="/ourstories"
//               >
//                 Ourstories
//               </Link>
//             </li>

//             {user && (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link px-3 py-2 rounded-pill transition-all ${
//                       location.pathname === "/createpost"
//                         ? "active bg-light text-dark fw-semibold"
//                         : "text-secondary hover-bg-light"
//                     }`}
//                     to="/createpost"
//                   >
//                     Write
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link px-3 py-2 rounded-pill transition-all ${
//                       location.pathname === "/profile"
//                         ? "active bg-light text-dark fw-semibold"
//                         : "text-secondary hover-bg-light"
//                     }`}
//                     to="/profile"
//                   >
//                     Profile
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>

//           {/* Right Section */}
//           <div className="d-flex align-items-center gap-3">
//             {/* Search Toggle (optional) */}
//             <button
//               className="btn btn-link text-dark p-2 rounded-circle hover-bg-light"
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <circle cx="11" cy="11" r="8"></circle>
//                 <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//               </svg>
//             </button>

//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold"
//                   style={{ fontSize: "0.95rem" }}
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn btn-dark rounded-pill px-4 py-2 fw-semibold"
//                   style={{ fontSize: "0.95rem" }}
//                 >
//                   Get Started
//                 </Link>
//               </>
//             ) : (
//               <div className="d-flex align-items-center gap-3">
//                 {/* Notification Bell (optional) */}
//                 <button className="btn btn-link text-dark p-2 rounded-circle hover-bg-light position-relative">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
//                     <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//                   </svg>
//                   <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
//                     <span className="visually-hidden">New notifications</span>
//                   </span>
//                 </button>

//                 {/* User Menu */}
//                 <div className="dropdown">
//                   <button
//                     className="btn btn-link text-dark p-0 border-0 dropdown-toggle"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <div className="d-flex align-items-center gap-2">
//                       <div
//                         className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
//                         style={{
//                           width: "36px",
//                           height: "36px",
//                           fontSize: "1rem",
//                           fontWeight: "600",
//                         }}
//                       >
//                         {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//                       </div>
//                       <span className="fw-semibold d-none d-lg-block">
//                         {user.name?.split(" ")[0]}
//                       </span>
//                     </div>
//                   </button>
//                   <ul className="dropdown-menu dropdown-menu-end mt-2 shadow-sm border-0 py-2">
//                     <li>
//                       <Link
//                         className="dropdown-item py-2"
//                         to="/profile"
//                       >
//                         <div className="d-flex align-items-center gap-3">
//                           <svg
//                             width="18"
//                             height="18"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           >
//                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                             <circle cx="12" cy="7" r="4"></circle>
//                           </svg>
//                           <span>Profile</span>
//                         </div>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item py-2"
//                         to="/settings"
//                       >
//                         <div className="d-flex align-items-center gap-3">
//                           <svg
//                             width="18"
//                             height="18"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           >
//                             <circle cx="12" cy="12" r="3"></circle>
//                             <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
//                           </svg>
//                           <span>Settings</span>
//                         </div>
//                       </Link>
//                     </li>
//                     <li>
//                       <hr className="dropdown-divider my-2" />
//                     </li>
//                     <li>
//                       <button
//                         className="dropdown-item py-2 text-danger"
//                         onClick={logout}
//                       >
//                         <div className="d-flex align-items-center gap-3">
//                           <svg
//                             width="18"
//                             height="18"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           >
//                             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                             <polyline points="16 17 21 12 16 7"></polyline>
//                             <line x1="21" y1="12" x2="9" y2="12"></line>
//                           </svg>
//                           <span>Sign Out</span>
//                         </div>
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Search Bar (expands when search is clicked) */}
//       {isSearchOpen && (
//         <div className="container mt-2 animate-slide-down">
//           <div className="row justify-content-center">
//             <div className="col-md-8">
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control rounded-pill bg-light border-0 py-2 px-4"
//                   placeholder="Search stories..."
//                   autoFocus
//                 />
//                 <button
//                   className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary"
//                   style={{ zIndex: 5 }}
//                 >
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <circle cx="11" cy="11" r="8"></circle>
//                     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
};

export default Navbar;