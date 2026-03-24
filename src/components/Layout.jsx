// Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Offcanvas Menu */}
      <div
        className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
        style={{ visibility: showOffcanvas ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="timocom-text mb-0">TIMOCOM</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowOffcanvas(false)}
          ></button>
        </div>

        <div className="list-group list-group-flush">
          <button
            className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
            onClick={() => navigate("/home")}
          >
            <i className="bi bi-house-door fs-5 text-success"></i>
            <span className="fw-medium">Home</span>
          </button>

          <button
            className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
            onClick={() => navigate("/library")}
          >
            <i className="bi bi-collection fs-5 text-success"></i>
            <span className="fw-medium">Library</span>
          </button>

          <button
            className="list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3"
            onClick={() => navigate("/profile")}
          >
            <i className="bi bi-person-circle fs-5 text-success"></i>
            <span className="fw-medium">Profile</span>
          </button>
        </div>

        <div className="border-top mt-4 pt-4 px-3">
          <div className="d-flex align-items-center gap-3 mb-3">
            <img
              src={`https://ui-avatars.com/api/?name=${
                currentUser?.name || "User"
              }&background=198754&color=fff&size=40`}
              alt="profile"
              className="rounded-circle"
            />
            <div>
              <p className="mb-0 fw-bold">{currentUser?.name || "User"}</p>
              <small className="text-muted">{currentUser?.email || ""}</small>
            </div>
          </div>
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {showOffcanvas && (
        <div
          className="offcanvas-backdrop fade show position-fixed top-0 start-0 w-100 h-100"
          onClick={() => setShowOffcanvas(false)}
          style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
      )}

      {/* Top navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link p-0 text-dark"
              onClick={() => setShowOffcanvas(true)}
            >
              <i className="bi bi-list fs-2"></i>
            </button>
            <span className="timocom-text">TIMOCOM</span>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;