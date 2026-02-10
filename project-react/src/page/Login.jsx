import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // นำ useNavigate มาใช้
import Swal from "sweetalert2"; // นำ SweetAlert2 มาใช้
import google from "../assets/google.svg";
import git from "../assets/git.svg";

const Login = () => {
  // สร้าง State สำหรับเก็บค่า Email และ Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับการ Login
  const handleLogin = (e) => {
    e.preventDefault(); // กันหน้าเว็บ Reload

    // เงื่อนไขเช็ค Admin
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      Swal.fire({
        icon: "success",
        title: "ยินดีต้อนรับแอดมิน",
        text: "กำลังนำคุณไปยังหน้า Dashboard",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin");
      });
    }
    // เงื่อนไขเช็ค User
    else if (email === "user@gmail.com" && password === "111111") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "user");
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        text: "ขอให้สนุกกับการเลือกที่พัก",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    }
    // ถ้าข้อมูลไม่ถูกต้อง
    else {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "กรุณาเช็ค Email หรือ Password อีกครั้ง",
        confirmButtonColor: "#0a192f",
      });
    }
  };

  return (
    <main className="flex flex-1 items-center h-screen justify-center p-6 bg-gradient-to-b from-blue-100 via-white to-blue-100 dark:from-navy-900 dark:via-background-dark dark:to-navy-900">
      <div className="layout-content-container flex flex-col w-full mt-16 max-w-[480px] bg-white/70 dark:bg-background-dark/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-8">
        <div className="mb-4">
          <h1 className="text-navy-deep dark:text-white tracking-tight text-3xl font-bold leading-tight text-center pb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            The best accommodation awaits you
          </p>
        </div>

        {/* Tab Login/Sign Up */}
        <div className="mb-6">
          <div className="flex border-b border-gray-300 px-4 gap-8 justify-center">
            <Link
              to="/Login"
              className="flex flex-col items-center justify-center border-b-2 border-[#0a192f] text-navy-deep dark:text-white pb-3 pt-2"
            >
              <p className="text-sm font-bold">Login</p>
            </Link>
            <Link
              to="/Register"
              className="flex flex-col items-center justify-center border-b-2 border-transparent text-gray-400 pb-3 pt-2 hover:text-navy-deep transition-all"
            >
              <p className="text-sm font-bold">Sign Up</p>
            </Link>
          </div>
        </div>

        {/* Form เริ่มต้นตรงนี้ */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <p className="text-navy-deep dark:text-gray-200 text-sm font-semibold pb-2">
                Email Address
              </p>
            </div>
            <input
              className="form-input flex w-full rounded-lg border border-gray-200 h-12 p-4 text-sm"
              placeholder="name@gmail.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // เก็บค่า Email
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center pb-2">
              <p className="text-navy-deep dark:text-gray-200 text-sm font-semibold">
                Password
              </p>
              <a
                className="text-xs font-medium text-blue-600 hover:underline"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <input
              className="form-input flex w-full rounded-lg border border-gray-200 h-12 p-4 text-sm"
              placeholder="••••••••"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // เก็บค่า Password
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-[#0a192f] hover:bg-navy-deep/90 text-white text-sm font-bold transition-all shadow-lg"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 h-11 border-2 border-gray-300 rounded-lg bg-white/60 hover:bg-white transition-colors">
            <img src={google} alt="Google" className="w-5 h-5" />
            <span className="text-xs font-semibold">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-11 border-2 border-gray-300 rounded-lg bg-white/60 hover:bg-white transition-colors">
            <img src={git} alt="Github" className="w-5 h-5" />
            <span className="text-xs font-semibold">Github</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
