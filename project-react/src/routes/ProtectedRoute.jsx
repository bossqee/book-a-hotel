import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, allowRole }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");

  // ตรวจสอบค่าใน Console (ตามภาพที่คุณส่งมา)
  console.log("Status:", isLoggedIn, "Role:", userRole);

  // แก้ไขตรงนี้: ถ้าเป็น null หรือไม่ใช่ "true" ให้ดีดออกทันที
  if (!isLoggedIn || isLoggedIn !== "true") {
    return <Navigate to="/Login" replace />;
  }

  // เช็ค Role สำหรับหน้า Admin
  if (allowRole === "admin" && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;