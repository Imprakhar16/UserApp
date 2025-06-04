import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { authServices } from "../../service/authServices";

export const Verify = () => {
  const navigate = useNavigate();
  const { email, token, id } = useParams();

  const handleVerify = async () => {
    try {
      const result = await authServices.verifyEmail(token, id);
      console.log(result);
      if (result.message === "Email verified successfully") {
        toast.success("email verified successfully , Please Login");
        // setTimeout(() => {
        navigate("/login");
        // }, 2000);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  // console.log(email,"",id,"",token);
  return (
    <>
      <center>
        <div style={{ marginTop: "250px" }}>
          <input
            type="text"
            value={email}
            className="form-control"
            style={{ width: "230px" }}
          />
          <br />
          <br />
          <button onClick={handleVerify} class="btn btn-outline-success">
            Verify Email
          </button>
        </div>
      </center>
    </>
  );
};
