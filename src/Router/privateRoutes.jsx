import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../layouts/sideBar";

const PrivateRoute = () => {
  const token = localStorage.getItem("authToken");

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const [isSidebarOpen, setSideBarOpen] = useState(false);

  return isLoggedIn || token ? (
    <div>
      <SideBar
        SideBarOpen={isSidebarOpen}
        setSideBarOpen={setSideBarOpen}
      ></SideBar>
      <div
        style={{
          marginLeft: isSidebarOpen ? "300px" : "0",
            transition: "margin-left 0.3s ease",
        }}  
      >
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
