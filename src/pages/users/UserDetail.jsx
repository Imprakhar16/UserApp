import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetail,
  updateUser,
} from "../../features/user/fetchDetailSlice";


import { Toast } from "../../components/toastComponent";
import CommonButton from "../../components/button";

export const UserDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(id)).then((res) => {
        const user = res.payload.user;
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            password: "",
          });
        }
      });
    }
  }, [id, dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser({ id, formData }));
      Toast("success", "Data updated successfully");
      setShowModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
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
    position: "relative",
  };

  return (
    <>
      {user !== null ? (
        <div style={containerStyle}>
          <center style={cardStyle}>
            {/* Back Button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/userlist")}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                fontSize: "14px",
              }}
            >
              Back
            </button>
            <h1 style={{ fontFamily: "cursive", color: "white" }}>User Detail</h1>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwTiGhEbkT1_hRJIuuvfatzFEaSIk6sgzqA&s"
                alt=""
                style={{ marginTop: "20px" }}
              />
              <br />
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <>
                  <h4>Name: {user.name}</h4>
                  <p>Email: {user.email}</p>
                  <p>UserId: {user.id}</p>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => setShowModal(true)}
                  >
                    Update User
                  </button>
                </>
              )}
            </div>
          </center>
        </div>
      ) : (
        <div style={containerStyle}>
          <center style={cardStyle}>
            <h1 style={{ fontFamily: "cursive", color: "white" }}>User Detail</h1>
            <div>
              <h3>No data found</h3>
            </div>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => navigate("/")}
            >
              Go To Home
            </button>
          </center>
        </div>
      )}

      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      disabled
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <CommonButton
                    title="Save Changes"
                    type="submit"
                    className="btn btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
