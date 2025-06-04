
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/routerIndex";

function App() {
  const tkn = localStorage.getItem("authToken");
  const [token, setToken] = useState(tkn);
  console.log(token);

  return <RouterProvider router={router(setToken)} />;
}

export default App;
