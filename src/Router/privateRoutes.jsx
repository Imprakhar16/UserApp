
import React from "react";
 import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../layouts/sideBar";


const PrivateRoute = () => {
  const token = localStorage.getItem("authToken");
 
 const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return isLoggedIn || token ?  <>  <SideBar></SideBar><Outlet /> </>: <Navigate to="/login" />;
};

export default PrivateRoute;
