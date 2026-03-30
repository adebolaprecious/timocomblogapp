import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
        }

        .landing-page {
          width: 100%;
          min-height: 100vh;
        }

        /* Navbar - Full Width & Sticky */
        .navbar {
          width: 100% !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .timocom-text {
          font-family: 'Arial Black', sans-serif;
          font-weight: 900;
          font-size: 1.9rem;
          background: linear-gradient(45deg, #198754, #146c43);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Hero Section - Full Screen */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(to right, #ffffff, #f8f9fa);
          display: flex;
          align-items: center;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-image {
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          max-width: 100%;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 20px;
          background: white;
        }

        /* Footer */
        footer {
          background: white;
          border-top: 1px solid #eee;
          padding: 30px 20px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }
          .hero-section {
            padding: 0 15px;
            min-height: 90vh;
          }
        }
      `}</style>

      <div className="landing-page">

        {/* Full Width Navbar */}
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
          <div className="container-fluid px-3 px-lg-4">
            <div className="d-flex align-items-center gap-2">
              <div style={{
                width: 40, 
                height: 40, 
                borderRadius: 12,
                background: 'linear-gradient(135deg, #198754, #146c43)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ 
                  fontSize: '26px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontFamily: 'Arial Black, sans-serif'
                }}>T</span>
              </div>
              <span className="timocom-text">TIMOCOM</span>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
                <li className="nav-item">
                  <Link to="/ourstories" className="nav-link fw-medium">Our Story</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link fw-medium">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-success rounded-pill px-4 py-2">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section - Full Screen */}
        <section className="hero-section">
          <div className="container">
            <div className="row align-items-center gy-5">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="hero-title">
                  Share Your Stories with the World
                </h1>
                <p className="lead text-secondary mb-4">
                  Timocom is where writers connect with readers. 
                  Share your ideas, learn from others, and grow your audience.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <Link to="/register" className="btn btn-success btn-lg rounded-pill px-5">
                    Start Writing
                  </Link>
                  <a href="#stories" className="btn btn-outline-secondary btn-lg rounded-pill px-5">
                    Read Stories
                  </a>
                </div>
              </div>

              <div className="col-lg-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
                  alt="Writing"
                  className="hero-image img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="bg-success text-white rounded-4 p-5 text-center">
              <h2 className="fw-bold mb-3">Ready to Share Your Story?</h2>
              <p className="lead mb-4">Join thousands of writers today</p>
              <Link to="/register" className="btn btn-light btn-lg rounded-pill px-5">
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-top py-4">
          <div className="container text-center text-secondary small">
            © 2026 Timocom. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;