import React from "react";
import "../App.css";
import Nav_Main from "../components/ui/Nav_Main.jsx";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="absolute inset-0 bg-cover bg-center home-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-10 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center text-white text-lg font-semibold animate-in duration-500">
              <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
                Home
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-white text-5xl md:text-7xl font-serif max-w-4xl leading-[1.1]">
          Your Gateway to the
        </h1>
        <h1 className="text-4xl font-bold title-yellow text-5xl md:text-7xl font-serif max-w-4xl leading-[1.1] italic mb-6">
          Extraordinary
        </h1>
        <p className="text-white/80 text-md font-light mb-12 max-w-2xl">
          สัมผัสประสบการณ์ความหรูหราและความสะดวกสบายอย่างที่ไม่เคยมีมาก่อน —
          การเข้าพักที่สมบูรณ์แบบของคุณเริ่มต้นที่นี่.
        </p>
        <div>
          <div className="">
            <span></span>
            <input type="text" />
          </div>
          <div className="">
            <span></span>
            <input type="text" />
          </div>
          <div className="">
            <span></span>
            <input type="text" />
          </div>
          <div>
            <button>
              <span className="material-symbols-outlined">search</span>
              <span>ค้นหา</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
