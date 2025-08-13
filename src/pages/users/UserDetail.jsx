import React from "react";

const UserDetail = ({ user }) => {
  if (!user) return <p style={{ textAlign: "center", color: "#999" }}>No user data available</p>;

  const cardStyle = {
    maxWidth: "320px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #f0f4ff, #d9e4ff)",
    borderRadius: "16px",
    padding: "30px 25px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#222",
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: "4px solid #4a90e2",
    boxShadow: "0 4px 12px rgba(74, 144, 226, 0.4)",
  };

  const nameStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "8px",
  };

  const emailStyle = {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#555",
    marginBottom: "16px",
  };

  const userIdStyle = {
    fontSize: "0.85rem",
    fontWeight: "400",
    color: "#888",
    letterSpacing: "0.05em",
  };

  return (
    <div style={cardStyle}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwTiGhEbkT1_hRJIuuvfatzFEaSIk6sgzqA&s"
        alt="User Avatar"
        style={avatarStyle}
      />
      <div style={nameStyle}>{user.name}</div>
      <div style={emailStyle}>{user.email}</div>
      <div style={userIdStyle}>User ID: {user.id}</div>
    </div>
  );
};

export default UserDetail;
