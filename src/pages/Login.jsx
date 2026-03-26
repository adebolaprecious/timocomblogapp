import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

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
        console.log(res.data);
  if (res.data.success && res.data.token) {
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  toast.success("Login successful 🎉");

  setTimeout(() => {
    navigate("/home");
  }, 1500);
} else {
  toast.error("Login failed");
}
        
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    // <div className="page-wrapper">
<div className="auth-wrapper">      
    <ToastContainer position="top-right" autoClose={3000} />

      {/* Top Navbar */}
     <div className="auth-navbar">
  <div className="brand-left">Timocom</div>

  <div className="brand-center">
    <h2>MyBlog</h2>
    <p>Share your ideas. Read amazing stories.</p>
  </div>
</div>

      {/* Centered Card */}
<div className="auth-content">
  <div className="auth-card">
          <div className="card shadow-lg border-0 p-4 rounded-4">
            <h3 className="text-center mb-4 fw-bold text-success">
              Welcome Back
            </h3>

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

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <label htmlFor="password">Password</label>
                <span
                  className="position-absolute end-0 top-50 translate-middle-y pe-3"
                  style={{ cursor: "pointer", color: "#198754", fontWeight: 500 }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <div className="form-check mb-3">
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
                className="btn btn-success w-100 btn-lg fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-light"></div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold text-success text-decoration-none">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  

  );
};

export default Login;