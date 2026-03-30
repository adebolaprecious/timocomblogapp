import React from 'react';
import { Link } from 'react-router-dom';
import './Ourstories.css';
const Ourstories = () => {
  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
        }

        .ourstories-page {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
        }

        /* Full Width Navbar */
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

        /* Hero Section */
        .hero-section {
          padding: 120px 20px 100px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          text-align: center;
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          color: #475569;
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        /* Feature Cards */
        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 40px 30px;
          box-shadow: 0 4px 25px rgba(0,0,0,0.06);
          height: 100%;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .feature-icon {
          font-size: 2.8rem;
          margin-bottom: 20px;
          color: #198754;
        }

        /* Mission Card */
        .mission-card {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          box-shadow: 0 6px 30px rgba(0,0,0,0.08);
        }

        /* CTA Cards */
        .cta-card {
          border-radius: 16px;
          padding: 40px 30px;
          height: 100%;
          transition: all 0.3s ease;
        }

        .cta-card:hover {
          transform: translateY(-6px);
        }

        /* Stats */
        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: #198754;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }
          .hero-section {
            padding: 80px 15px 70px;
          }
          .feature-card, .cta-card {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="ourstories-page">

        {/* Full Width Navbar */}
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
          <div className="container-fluid px-3 px-lg-4">
            <div className="d-flex align-items-center gap-2">
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #198754, #146c43)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ fontSize: '26px', fontWeight: 'bold', color: 'white' }}>T</span>
              </div>
              <span className="timocom-text">TIMOCOM</span>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
                <li className="nav-item">
                  <Link to="/" className="nav-link fw-medium">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ourstories" className="nav-link fw-medium active">Our Story</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link fw-medium">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-success rounded-pill px-4 py-2">Get Started</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-9">
                <h1 className="hero-title">Everyone has a story to tell</h1>
                <p className="hero-subtitle">
                  Timocom is a home for human stories and ideas. Here, anyone can share knowledge 
                  and wisdom with the world—without having to build a mailing list or a following first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card text-center">
                  <div className="feature-icon">✍️</div>
                  <h3 className="h4 fw-bold mb-3">Simple & Beautiful</h3>
                  <p className="text-secondary">
                    The internet is noisy. Timocom is quiet yet full of insight. 
                    Simple, beautiful, and helps you find the right readers.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-card text-center">
                  <div className="feature-icon">⏳</div>
                  <h3 className="h4 fw-bold mb-3">Time Well Spent</h3>
                  <p className="text-secondary">
                    We reward depth, nuance, and thoughtful conversation. 
                    A space for substance over packaging.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-card text-center">
                  <div className="feature-icon">🌍</div>
                  <h3 className="h4 fw-bold mb-3">100M+ Readers</h3>
                  <p className="text-secondary">
                    Over 100 million people read and share wisdom on Timocom every month. 
                    From developers to CEOs — everyone has a story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="mission-card text-center mx-auto" style={{ maxWidth: '900px' }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="1.5" className="mb-4">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <blockquote className="fs-4 fst-italic text-secondary mb-4" style={{ lineHeight: '1.7' }}>
                "Ultimately, our goal is to deepen our collective understanding of the world 
                through the power of writing. We believe that what you read and write matters."
              </blockquote>
              <div className="small text-muted">— The Timocom Team</div>
            </div>
          </div>
        </section>

        {/* CTA Cards */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <Link to="/" className="text-decoration-none">
                  <div className="cta-card bg-dark text-white text-center">
                    <h3 className="h4 fw-bold mb-3">Start Reading</h3>
                    <p className="text-white-50">Dive deeper into whatever matters to you.</p>
                    <div className="mt-4 text-white">Start Reading →</div>
                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link to="/createpost" className="text-decoration-none">
                  <div className="cta-card bg-success text-white text-center">
                    <h3 className="h4 fw-bold mb-3">Start Writing</h3>
                    <p className="text-white-50">Share your knowledge with the world.</p>
                    <div className="mt-4 text-white">Start Writing →</div>
                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link to="/register" className="text-decoration-none">
                  <div className="cta-card bg-primary text-white text-center">
                    <h3 className="h4 fw-bold mb-3">Join the Community</h3>
                    <p className="text-white-50">Become part of a growing movement of thoughtful writers.</p>
                    <div className="mt-4 text-white">Join Now →</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-number">100M+</div>
                <div className="text-secondary">Monthly Readers</div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-number">1M+</div>
                <div className="text-secondary">Community Members</div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-number">50K+</div>
                <div className="text-secondary">Writers</div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-number">2024</div>
                <div className="text-secondary">Founded</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-top py-5 text-center text-secondary small">
          © 2026 Timocom. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Ourstories;