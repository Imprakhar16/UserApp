
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/resetPassSlice";
import { Toast } from "../../components/toastComponent";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPass, setResetPass] = useState("");
  const { userId, authToken } = useParams();
  const dispatch = useDispatch();

  const rawBody = {
    password: resetPass,
    token: authToken,
    userId: userId,
  };

  const handleReset = async () => {
    try {
        dispatch(resetPassword(rawBody))
       
      // toast.success("password reset successfully")
       Toast("success","password reset successfully")
      navigate("/");
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #ff7f50, #6a5acd)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Reset Your Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={resetPass}
        onChange={(e) => setResetPass(e.target.value)}
      />
      <br />
      <button onClick={handleReset} class="btn btn-outline-success">Reset Password</button>
    </div>
  );
};