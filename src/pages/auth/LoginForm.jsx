import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Modal } from "bootstrap";

// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/loginSlice";
import { forgetPassword } from "../../features/auth/forgetPassSlice";
import CommonButton from "../../components/button";
import { Toast } from "../../components/toastComponent";

export const Login = () => {
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");
  const dispatch = useDispatch();
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
    const body = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(body)).then((res) => {
      const name = res.payload.name;
      Toast("success",`Hi ${name}, Welcome Back`)
      window.location.reload();
    });
  };
  const handleForget = async () => {
    try {
      const rawData = { email: forgotEmail };
      dispatch(forgetPassword(rawData));
  Toast("success","Reset link sent to your email!")
      // toast.success("Reset link sent to your email!");
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
    backgroundImage: "linear-gradient(346deg, #667eea 0%, #764ba2 100%)",

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

              <CommonButton
                title="Log In"
                type="submit"
                className="btn btn-success w-100 mt-3"
              ></CommonButton>
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

              <CommonButton
                type="button"
                className="btn-close"
                dataAction="modal"
                aria-label="Close"
              ></CommonButton>
            </div>
            <div className="modal-body">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <CommonButton
                type="button"
                className="btn btn-secondary"
                dataAction="modal"
                title="Close"
              ></CommonButton>

              <CommonButton
                type="button"
                className="btn btn-primary"
                title="Send Reset Link"
                onClick={handleForget}
              ></CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
