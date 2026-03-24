import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-white border-top mt-5">
      {/* Hero Section - Add this at the top of footer */}
      <div className="footer-hero bg-light py-5 border-bottom">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-3" style={{ letterSpacing: '-0.02em' }}>
                Human stories <span className="text-success">&</span> ideas
              </h2>
              <p className="lead text-secondary mb-4" style={{ fontSize: '1.25rem' }}>
                A place to read, write, and deepen your understanding
              </p>
              <Link 
                to="/posts" 
                className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-semibold hover-lift"
                style={{ fontSize: '1.1rem' }}
              >
                Start reading
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your existing footer content */}
      <div className="container py-5">
        {/* Main Footer Content */}
        <div className="row g-4 pb-4">
          {/* Brand Section */}
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none">
              <h3 className="fw-bold text-dark mb-3" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                TimocomBlog
                <span className="text-success mx-1">•</span>
              </h3>
            </Link>
            <p className="text-secondary mb-3" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Everyone has a story to tell. TimocomBlog is a home for human stories 
              and ideas. Here, anyone can share knowledge and wisdom with the world.
            </p>
            <div className="d-flex gap-3">
              {/* Social Links */}
              <a href="#" className="text-secondary hover-text-success transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-secondary hover-text-success transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-secondary hover-text-success transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
              <a href="#" className="text-secondary hover-text-success transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none hover-text-success transition-all">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/posts" className="text-secondary text-decoration-none hover-text-success transition-all">Stories</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-secondary text-decoration-none hover-text-success transition-all">About</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-secondary text-decoration-none hover-text-success transition-all">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Write */}
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-3">Write</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/createpost" className="text-secondary text-decoration-none hover-text-success transition-all">Write a story</Link>
              </li>
              <li className="mb-2">
                <Link to="/drafts" className="text-secondary text-decoration-none hover-text-success transition-all">Drafts</Link>
              </li>
              <li className="mb-2">
                <Link to="/stats" className="text-secondary text-decoration-none hover-text-success transition-all">Stats</Link>
              </li>
              <li className="mb-2">
                <Link to="/settings" className="text-secondary text-decoration-none hover-text-success transition-all">Settings</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/help" className="text-secondary text-decoration-none hover-text-success transition-all">Help center</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-secondary text-decoration-none hover-text-success transition-all">Privacy policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-secondary text-decoration-none hover-text-success transition-all">Terms of service</Link>
              </li>
              <li className="mb-2">
                <Link to="/cookies" className="text-secondary text-decoration-none hover-text-success transition-all">Cookie policy</Link>
              </li>
            </ul>
          </div>

          {/* Membership */}
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3">Membership</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/membership" className="text-secondary text-decoration-none hover-text-success transition-all">Become a member</Link>
              </li>
              <li className="mb-2">
                <Link to="/subscribe" className="text-secondary text-decoration-none hover-text-success transition-all">Subscribe</Link>
              </li>
              <li className="mb-2">
                <Link to="/gift" className="text-secondary text-decoration-none hover-text-success transition-all">Gift membership</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="row py-4 border-top border-bottom">
          <div className="col-lg-8 mx-auto text-center">
            <h5 className="fw-bold mb-3">Get the best of TimocomBlog in your inbox</h5>
            <p className="text-secondary mb-4">A weekly digest of our best stories, delivered weekly.</p>
            <div className="row g-2 justify-content-center">
              <div className="col-md-6">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control rounded-pill bg-light border-0 py-2 px-4" 
                    placeholder="Enter your email"
                    aria-label="Email address"
                  />
                  <button 
                    className="btn btn-success rounded-pill px-4 ms-2"
                    type="button"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <small className="text-muted d-block mt-3">
              We respect your privacy. Unsubscribe at any time.
            </small>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row pt-4">
          <div className="col-md-6">
            <p className="text-secondary mb-0 small">
              © {currentYear} TimocomBlog. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/privacy" className="text-secondary text-decoration-none small me-3 hover-text-success">Privacy</Link>
            <Link to="/terms" className="text-secondary text-decoration-none small me-3 hover-text-success">Terms</Link>
            <Link to="/sitemap" className="text-secondary text-decoration-none small hover-text-success">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;