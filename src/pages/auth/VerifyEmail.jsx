import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { verify } from "../../features/auth/verifyEmailSlice";
import CommonButton from "../../components/button";
import { Toast } from "../../components/toastComponent";

export const Verify = () => {
  const navigate = useNavigate();
  const { email, token, id } = useParams();
  const dispatch = useDispatch();

  const handleVerify = async () => {
    try {
      dispatch(verify(token, id));
      
Toast("success","email verified successfully , Please Login")
      navigate("/login");
    } catch (e) {
      console.log(e.response);
    }
  };

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
        
          <CommonButton  title='Verify Email' onClick={handleVerify} class="btn btn-outline-success"> </CommonButton>
        </div>
      </center>
    </>
  );
};
