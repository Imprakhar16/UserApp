import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Typography } from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/registerSlice";

import CommonButton from "../../components/button";
import { Toast } from "../../components/toastComponent";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = { name: "", email: "", password: "" };

  const {loading} = useSelector(state=> state.register)

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) errors.password = "password is required";
    return errors;
  };

  const handleSave = async (values) => {
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    ).then((res) => {
      console.log(res);
      const { emailVerificationTOken, id } = res.payload;
      Toast("success",`Hi ${name}, please verify your email.`)
   //   toast.success(`Hi ${name}, please verify your email.`);
      navigate(`/verification/${values.email}/${emailVerificationTOken}/${id}`);
    });
  };

  
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
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
          <h1>Register Here!</h1>
          <Formik
            initialValues={initialState}
            validate={validate}
            onSubmit={handleSave}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <label>Enter a name:</label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control w-80"
                    placeholder="Enter a name"
                  />
                  {errors.name && touched.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <br />
                <div>
                  <label>Email:</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control w-80"
                    placeholder="Enter Email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <br />
                <div>
                  <label>Password:</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control w-80"
                    placeholder="Enter Password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <br />
                
                <CommonButton  title={loading ? "registering ..." : "Register user"} type="submit" disabled={loading} className="btn btn-success"></CommonButton>
              </Form>
            )}
          </Formik>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-gray-900"
              onClick={() => navigate("/login")}
            >
              Sign In
            </a>
          </Typography>
        </center>
      </div>
    </div>
  );
};
