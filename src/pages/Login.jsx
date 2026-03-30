import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(
          "https://timocombackend.vercel.app/api/v1/users/login",
          values
        );

        if (res.data.success && res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          toast.success("Login successful 🎉");

          setTimeout(() => {
            navigate("/home");
          }, 1200);
        } else {
          toast.error("Login failed");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100vh !important;
          overflow: hidden !important;
        }

        .login-page {
          width: 100%;
          height: 100vh;
          background: #f0f7f4;           /* Very light green */
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
          padding: 45px 35px;
          transition: all 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .brand-logo {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #198754, #146c43);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 32px;
          font-weight: bold;
        }

        .form-floating input {
          height: 52px;
          border-radius: 12px;
        }

        .password-toggle {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #198754;
          font-weight: 600;
          font-size: 14px;
        }

        button.btn-success {
          height: 52px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
        }

        .auth-navbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .timocom-brand {
          font-family: 'Arial Black', sans-serif;
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(45deg, #198754, #146c43);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="login-page">

        {/* Top Navbar */}
        <div className="auth-navbar">
          <div className="timocom-brand">TIMOCOM</div>
        </div>

        {/* Login Card - Centered */}
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="brand-logo">T</div>
            <h3 className="fw-bold text-dark mb-2">Welcome Back</h3>
            <p className="text-muted">Sign in to continue to Timocom</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-4 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <label htmlFor="password">Password</label>
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                {...formik.getFieldProps("remember")}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-4 mb-0 text-muted">
            Don’t have an account?{" "}
            <Link to="/register" className="text-success fw-semibold text-decoration-none">
              Create one
            </Link>
          </p>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Login;