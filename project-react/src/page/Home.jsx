import React from "react";
import "../App.css";
import { Link } from "react-router";
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

const Home = () => {
  return (
    <div className="absolute inset-0 bg-cover bg-center home-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
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
      <div className="absolute top-125 left-1/2 px-4 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};
export default Home;
