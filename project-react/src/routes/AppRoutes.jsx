import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";
import Layout from "../layout/Layout.jsx";
import Home from "../page/Home.jsx";
import Accommodations from "../page/Accommodations.jsx";
import Login from "../page/Login.jsx";
import Register from "../page/Register.jsx";
import AdminDashboard from "../page/admin/AdminDashboard.jsx";
import LayoutAdmin from "../layout/LayoutAdmin.jsx";
import Category from "../page/admin/Category.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MyBookings from "../page/MyBookings.jsx";


const router = createBrowserRouter([
  
  {
    path: "/",
    element: (
      <ProtectedRoute> 
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "Accommodations", element: <Accommodations /> },
      { path: "MyBookings", element: <MyBookings /> },
    ],
  },

  // --- ส่วนของ ADMIN ---
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowRole="admin">
        {/* ครอบเพื่อให้เข้าได้เฉพาะคนที่มี Role เป็น admin เท่านั้น */}
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "category", element: <Category /> },
    ],
  },

  // --- ส่วนที่เข้าได้โดยไม่ต้อง Login ---
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;