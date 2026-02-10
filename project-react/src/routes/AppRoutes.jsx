import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";
import Layout from "../layout/Layout.jsx";
import Home from "../page/Home.jsx";
import Accommodations from "../page/Accommodations.jsx";
import Login from "../page/Login.jsx";
import Register from "../page/Register.jsx";
import AdminDashboard from "../page/admin/AdminDashboard.jsx";
import { path } from "framer-motion/client";
import LayoutAdmin from "../layout/LayoutAdmin.jsx";
import Category from "../page/admin/Category.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "Accommodations", element: <Accommodations /> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <LayoutAdmin />,
  //   children: [
  //     { index: true, element: <AdminDashborad /> },
  //     { path: "AdminDashboard", element: <AdminDashboard /> },
  //     { path: "Category", element: <Category /> },
  //     { path: "Product", element: <Product /> },
  //   ],
  // },
]);
const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoutes;
