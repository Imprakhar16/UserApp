import React from "react";
import { createBrowserRouter } from "react-router-dom";

import PublicRoute from "./publicRoutes.jsx";

import { Login } from "../pages/auth/LoginForm.jsx";
import { Register } from "../pages/auth/RegisterForm.jsx";
import { UserList } from "../pages/users/UserLIst.jsx";
import { Verify } from "../pages/auth/VerifyEmail.jsx";
import { ResetPassword } from "../pages/auth/ResetPassword.jsx";
import PrivateRoute from "./privateRoutes.jsx";
import HomePage from "../pages/users/homePage.jsx";

const router = (setToken) =>
  createBrowserRouter([
    {
      element: <PrivateRoute></PrivateRoute>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
        },
        {
          path: "/userlist",
          element: <UserList onSignOut={setToken} />,
        },
      ],
    },
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/login",
          element: <Login onSuccess={setToken} />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verification/:email/:token/:id",
          element: <Verify />,
        },
        {
          path: "/verification",
          element: <Verify />,
        },
        {
          path: "/auth/reset-password/:userId/:authToken",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

export default router;
