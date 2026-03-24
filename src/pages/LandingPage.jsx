import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const latestPosts = posts.slice(-3).reverse();
    setFeaturedPosts(latestPosts);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="bg-light min-vh-100">

      {/* ✅ NAVBAR (Matching HomePage Style) */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container">

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
    <span className="timocom-text-success">TIMOCOM</span>
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
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <Link to="/ourstories" className="nav-link">
                  Our Story
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="btn btn-success rounded-pill px-4"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ HERO SECTION */}
      <section className="hero-section d-flex align-items-center">
  <div className="container">
    <div className="row align-items-center gy-5">

      <div className="col-lg-6 text-center text-lg-start">
        <h1 className="display-4 fw-bold mb-3 hero-title">
          Share Your Stories with the World
        </h1>

        <p className="lead text-secondary mb-4">
          Timocom is where writers connect with readers.
          Share your ideas, learn from others, and grow your audience.
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
          <a href="#cta" className="btn btn-success btn-lg rounded-pill px-4">
            Start Writing
          </a>
          <a href="#stories" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
            Read Stories
          </a>
        </div>
      </div>

      {/* Animated Hero Image */}
      <div className="col-lg-6 text-center">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
          alt="Writing"
          className="img-fluid hero-image"
        />
      </div>

    </div>
  </div>
</section>

      {/* ✅ CTA */}
      <section className="container py-5">
        <div className="bg-success text-white rounded-4 p-5 text-center">
          <h2 className="fw-bold">Ready to Share Your Story?</h2>
          <p className="lead">Join thousands of writers today</p>
          <Link
            to="/register"
            className="btn btn-light btn-lg rounded-pill px-5 mt-3"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer className="bg-white border-top py-4">
        <div className="container text-center text-secondary small">
          © 2024 Timocom. All rights reserved.
        </div>
      </footer>

      {/* Smooth hover animation */}
      <style>{`
      body {
  margin: 70px;
  overflow-x: hidden;
  margin-left: -320px;
}
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.15) !important;
        }
        .transition {
          transition: all 0.3s ease;
        }
          html {
  scroll-behavior: smooth;
}

/* Full screen hero */
.hero-section {
  min-height: 100vh;
  background: linear-gradient(to right, #ffffff, #f8f9fa);
  padding: 200px 70px;
  margin-top: 10px;
  // margin-left: 200px;
  // margin-right: -500px;
}

/* Smooth text fade-in */
.hero-title {
  animation: fadeInUp 1s ease forwards;
}

/* Floating animated image */
.hero-image {
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  animation: float 4s ease-in-out infinite;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}
  .card:hover {
  transform: translateY(-8px);
  transition: 0.3s ease;
}
      `}</style>
    </div>
  );
};

export default LandingPage;