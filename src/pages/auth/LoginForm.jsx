import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Typography } from "@material-tailwind/react";

import { useDispatch } from "react-redux";
import { login } from "../../features/auth/loginSlice";
import { forgetPassword } from "../../features/auth/forgetPassSlice";
import CommonButton from "../../components/button";
import { Toast } from "../../components/toastComponent";
import { CommonModal } from "../../components/modal";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [forgotEmail, setForgotEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      console.log(res);
      const name = res.payload.name;
      Toast("success", `Hi ${name}, Welcome Back`);
      navigate("/");
    });
  };

  const handleForget = async () => {
    try {
      const rawData = { email: forgotEmail };
      dispatch(forgetPassword(rawData));
      Toast("success", "Reset link sent to your email!");
      setForgotEmail("");
      setShowModal(false); 
    } catch (error) {
      console.error("Failed to send reset link.", error);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
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
                <span
                  className="text-white"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => setShowModal(true)}
                >
                  Forget Password?
                </span>
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
          <span
            className="text-white fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register Here
          </span>
        </Typography>
      </div>

      {showModal && (
        <CommonModal modalTitle="Forgot Password" close={setShowModal}>
          <div className="mb-3">
            <label>Enter your email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <CommonButton
              type="button"
              className="btn btn-secondary"
              title="Cancel"
              onClick={() => setShowModal(false)}
            />
            <CommonButton
              type="button"
              className="btn btn-primary"
              title="Send Reset Link"
              onClick={handleForget}
            />
          </div>
        </CommonModal>
      )}
    </div>
  );
};
