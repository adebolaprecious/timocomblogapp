import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Za-z]/, "Must contain at least one letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("Password is required"),
    agree: Yup.boolean().oneOf([true], "You must accept the terms & conditions"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agree: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { agree, ...data } = values;

        await axios.post(
          "https://timocombackend.vercel.app/api/v1/users/register",
          data
        );

        toast.success("Account created successfully! 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed");
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

        .register-page {
          width: 100%;
          height: 100vh;
          background: #f0f7f4;           /* Very light green - same as Login */
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

      <div className="register-page">

        {/* Top Navbar */}
        <div className="auth-navbar">
          <div className="timocom-brand">TIMOCOM</div>
        </div>

        {/* Register Card - Centered */}
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="brand-logo">T</div>
            <h3 className="fw-bold text-dark mb-2">Create Account</h3>
            <p className="text-muted">Join Timocom and start sharing your stories</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
                    id="firstName"
                    placeholder="First Name"
                    {...formik.getFieldProps("firstName")}
                  />
                  <label>First Name</label>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
                    id="lastName"
                    placeholder="Last Name"
                    {...formik.getFieldProps("lastName")}
                  />
                  <label>Last Name</label>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <label>Email address</label>
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                id="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <label>Password</label>
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                className={`form-check-input ${formik.touched.agree && formik.errors.agree ? "is-invalid" : ""}`}
                id="agree"
                {...formik.getFieldProps("agree")}
              />
              <label className="form-check-label" htmlFor="agree">
                I agree to the{" "}
                <span className="text-success fw-semibold">Terms & Conditions</span>
              </label>
              {formik.touched.agree && formik.errors.agree && (
                <div className="invalid-feedback d-block">{formik.errors.agree}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 btn-lg"
              disabled={loading || !formik.isValid}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-4 mb-0 text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-success fw-semibold text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Register;