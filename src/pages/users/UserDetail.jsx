import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axiosInstance from "../../helper/axiosInterceptor";
import { userServices } from "../../service/userServices";

export const UserDetail = () => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [datafound, setDataFound] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await userServices.userDetail(id);
      const fetchedUser = response.user;
      console.log(fetchedUser);
      setUser(fetchedUser);
      setFormData({
        name: fetchedUser.name,
        email: fetchedUser.email,
      });
    } catch (e) {
      if (e.status == 500 || e.response.data == "Internal server error") {
        setDataFound(!datafound);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // handle user update
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axiosInstance.put(`user/${id}`, formData);
      console.log("User updated:", response.data);
      setUser(response.data.updatedUser || formData);
      setShowModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
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
    <>
      { datafound ? (
        <div style={containerStyle}>
          <center style={cardStyle}>
            <h1 style={{ fontFamily: "cursive", color: "white" }}>
              User Detail
            </h1>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwTiGhEbkT1_hRJIuuvfatzFEaSIk6sgzqA&s"
                alt=""
                style={{ marginTop: "20px" }}
              />
              <br />
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
            </div>
          </center>
        </div>
      ) : (
        <div style={containerStyle}>
          <center style={cardStyle}>
            <h1 style={{ fontFamily: "cursive", color: "white" }}>
              User Detail
            </h1>
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
                <form onSubmit={handleSubmit}>
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
                    <label className="form-label">password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
