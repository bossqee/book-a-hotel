import React from "react";
import "../App.css";
import Nav_Main from "../components/ui/Nav_Main.jsx";
import { Link } from "react-router";
import Search_Bar from "../components/ui/Search_Bar.jsx";
import Title from "../components/ui/Title.jsx";
import Dropdown from "../components/ui/Dropdown.jsx";
import { useState } from "react";

const Home = () => {
  return (
    <div className="absolute inset-0 bg-cover bg-center home-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-10 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center text-white text-lg font-semibold animate-in duration-500">
              <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
                MoonNight.com
              </Link>
            </div>
            <div className="flex items-center gap-6 text-white text-md animate-in duration-500">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"Accommodations"}
              >
                ที่พัก{" "}
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"Packages"}
              >
                ตั๋วเครื่องบิน + ที่พัก{" "}
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"Offers"}
              >
                ส่วนลด - ข้อเสนอพิเศษ{" "}
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"Login"}
              >
                ลงชื่อเข้าใช้{" "}
              </Link>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                className="bg-btn hover:bg-accent-gold/90 text-deep-navy px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg"
                to={"Register"}
              >
                สมัครสมาชิก{" "}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Title />
      <div className="absolute top-125 left-1/2 px-4 transform -translate-x-1/2 -translate-y-1/2">
        <Search_Bar />
      </div>
    </div>
  );
};
export default Home;
