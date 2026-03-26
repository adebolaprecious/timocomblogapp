import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // ✅ VALIDATION SCHEMA
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Za-z]/, "Must contain at least one letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("Password is required"),

    agree: Yup.boolean()
      .oneOf([true], "You must accept terms & conditions"),
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
        const { agree, ...data } = values;

        await axios.post(
          "https://timocombackend.vercel.app/api/v1/users/register",
          data
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
            {/* First Name */}
            <div className="form-floating mb-2">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : ""
                }`}
                id="firstName"
                placeholder="First Name"
                {...formik.getFieldProps("firstName")}
              />
              <label>First Name</label>
              <div className="invalid-feedback">
                {formik.errors.firstName}
              </div>
            </div>

            {/* Last Name */}
            <div className="form-floating mb-2">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "is-invalid"
                    : ""
                }`}
                id="lastName"
                placeholder="Last Name"
                {...formik.getFieldProps("lastName")}
              />
              <label>Last Name</label>
              <div className="invalid-feedback">
                {formik.errors.lastName}
              </div>
            </div>

            {/* Email */}
            <div className="form-floating mb-2">
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                id="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <label>Email</label>
              <div className="invalid-feedback">
                {formik.errors.email}
              </div>
            </div>

            {/* Password */}
            <div className="form-floating mb-2">
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <label>Password</label>
              <div className="invalid-feedback">
                {formik.errors.password}
              </div>
            </div>

            {/* ✅ TERMS CHECKBOX */}
            <div className="form-check mt-3 mb-3">
              <input
                type="checkbox"
                className={`form-check-input ${
                  formik.touched.agree && formik.errors.agree
                    ? "is-invalid"
                    : ""
                }`}
                id="agree"
                {...formik.getFieldProps("agree")}
              />
              <label className="form-check-label">
                I agree to the{" "}
                <span className="text-success fw-semibold">
                  Terms & Conditions
                </span>
              </label>
              <div className="invalid-feedback d-block">
                {formik.errors.agree}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-success w-100 btn-lg fw-bold"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-semibold text-success text-decoration-none"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;