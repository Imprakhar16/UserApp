import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../features/auth/verifyEmailSlice";
import CommonButton from "../../components/button";
import { Toast } from "../../components/toastComponent";

export const Verify = () => {
  const navigate = useNavigate();
  const { email, token, id } = useParams();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.verifyEmail);
  const handleVerify = async () => {
    try {
      dispatch(verify({ token, id }));

      Toast("success", "email verified successfully , Please Login");
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

          <CommonButton
            title={loading ? "Verifying ..." : "Verify Email"}
            onClick={handleVerify}
            className="btn btn-success"
            disabled={loading}
          >
            {" "}
          </CommonButton>
        </div>
      </center>
    </>
  );
};
