
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { authServices } from "../../service/authServices";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPass, setResetPass] = useState("");
  const { userId, authToken } = useParams();

  const rawBody = {
    password: resetPass,
    token: authToken,
    userId: userId,
  };

  const handleReset = async () => {
    try {
      const result = await authServices.resetPassword(rawBody);
      toast.success("password reset successfully")
      console.log(result);
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