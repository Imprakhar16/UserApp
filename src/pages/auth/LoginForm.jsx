import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Modal } from "bootstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@material-tailwind/react";
import { authServices } from "../../service/authServices";

export const Login = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");
  const modalRef = useRef();

  const initialState = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSave = async (values) => {
    try {
      const body = {
        email: values.email,
        password: values.password,
      };

      const result = await authServices.LoginUser(body);
      console.log(result);

      if (result.message === "success") {
        const token = result.data.token;
        toast.success(`Welcome Back ${result.data.name}`);
        localStorage.setItem("authToken", token);
        onSuccess(token);
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (e) {
      console.error("Login error:", e);
      if (e) {
        const message = e.message || "An error occurred during login";
        console.log(message);
        if (message === "Email is not verified") {
          toast.error("Please verify your email first");
        } else if (message === "Invalid credentials") {
         
          
          toast.error("Incorrect credentials");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleForget = async () => {
    try {
      const rawData = { email: forgotEmail };
      const result = await authServices.forget(rawData);
      console.log(result);
      toast.success("Reset link sent to your email!");
      setForgotEmail("");
      const modalInstance = Modal.getInstance(modalRef.current);
      if (modalInstance) {
        modalInstance.hide();
      }

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    } catch (error) {
      toast.error("Failed to send reset link.");
      console.log(error);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    // background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <center>
          <h1 style={{ color: "#ffffff" }}>Login!</h1>
        </center>
        <Formik
          initialValues={initialState}
          validate={validate}
          onSubmit={handleSave}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label>Email:</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
                {errors.email && touched.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label>Password:</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
                {errors.password && touched.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>

              <Typography
                color="white"
                className="mt-2 text-center font-normal"
              >
                <a
                  href="#"
                  className="text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#forgotPasswordModal"
                >
                  Forget Password?
                </a>
              </Typography>

              <button type="submit" className="btn btn-success w-100 mt-3">
                Log In
              </button>
            </Form>
          )}
        </Formik>

        <Typography color="white" className="mt-3 text-center font-normal">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-white fw-bold"
            onClick={() => navigate("/register")}
          >
            Register Here
          </a>
        </Typography>
      </div>

      {/* //forget popup modal */}

      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">
                Forgot Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleForget}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
