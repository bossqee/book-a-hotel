import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";
import Layout from "../layout/Layout.jsx";
import Home from "../page/Home.jsx";
import Offers from "../page/Offers.jsx";
import Accommodations from "../page/Accommodations.jsx";
import Packages from "../page/Packages.jsx";
import Login from "../page/Login.jsx";
import Register from "../page/Register.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "Offers", element: <Offers /> },
      { path: "Accommodations", element: <Accommodations /> },
      { path: "Packages", element: <Packages /> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
    ],
  }
]);
const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoutes;
