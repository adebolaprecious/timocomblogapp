import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css"; // make sure this file exists

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://timocombackend.vercel.app/api/v1/users/register",
          values
        );

        toast.success("Account created successfully 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (err) {
        toast.error(err.response?.data?.message || "Register failed");
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar */}
      <div className="auth-navbar">
        <div className="brand-left">Timocom</div>

        <div className="brand-center">
          <h2>MyBlog</h2>
          <p>Share your ideas. Read amazing stories.</p>
        </div>
      </div>

      {/* Register Card */}
      <div className="auth-content">
        <div className="auth-card">
          <h3 className="text-center mb-4 fw-bold text-success">
            Create Account
          </h3>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                {...formik.getFieldProps("firstName")}
              />
              <label htmlFor="firstName">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                {...formik.getFieldProps("lastName")}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>

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

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="btn btn-success w-100 btn-lg fw-bold">
              Register
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-success text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;