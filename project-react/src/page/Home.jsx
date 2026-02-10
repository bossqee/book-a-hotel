import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router";
import Title from "../components/ui/Title.jsx";
import { useState } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "motion/react";
import ShinyText from "../components/reactbits/ShinyText.jsx";
import Search_Bar from "../components/ui/Search_Bar.jsx";
import { Data } from "../data/Data.js";
import Popular from "../components/ui/Popular.jsx";
import Hero from "../components/ui/Hero.jsx";
import Footer from "../components/ui/Footer.jsx";
import Swal from "sweetalert2"; // 2. นำ SweetAlert2 มาใช้

const Home = () => {
  const navigate = useNavigate();

  // 3. ฟังก์ชันสำหรับ Logout
  const handleLogout = (e) => {
    e.preventDefault(); // ป้องกันการเปลี่ยนหน้าทันที

    Swal.fire({
      title: "ยืนยันการออกจากระบบ?",
      text: "คุณต้องการออกจากเซสชันปัจจุบันหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007b40",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้ากดตกลง
        Swal.fire({
          title: "ออกจากระบบสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/Login"); // ดีดกลับไปหน้า Login หรือ "/" ตามต้องการ
        });
      }
    });
    localStorage.clear();

    // 2. ดีดไปหน้า Login
    navigate("/Login", { replace: true });
  };
  return (
    <div className="absolute inset-0 bg-cover bg-center home-background">
      <nav className="absolute top-0 left-0 right-0 z-50 glass-nav border-b border-white/10 backdrop-blur-md   shadow-md">
        <div className="max-w-[1440px] mx-auto px-10 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center text-white text-lg font-semibold animate-in duration-500">
              <ShinyText
                text={<Link to={"/"}>MoonNight.com</Link>}
                className=""
                animationDuration={1500}
                delayDuration={500}
                speed={3.1}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={105}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </div>
            <div className="flex items-center gap-6 text-white text-md animate-in duration-500">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"Accommodations"}
              >
                Accommodations{" "}
              </Link>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"MyBookings"}
              >
                MyBookings{" "}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-btn text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Title />
      <Popular />
      <Hero />
      <Footer />
    </div>
  );
};
export default Home;
