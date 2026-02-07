import React from "react";
import "../App.css";
import { Link } from "react-router";
import Title from "../components/ui/Title.jsx";
import { useState } from "react";
import { useRef } from "react";
import { Data } from '../data/Data';
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "motion/react";
import ShinyText from "../components/reactbits/ShinyText.jsx";
import ScrollReveal from "../components/reactbits/ScrollReveal.jsx";
import Search_Bar from "../components/ui/Search_Bar.jsx";

const Home = () => {
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

      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto mt-16">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800">
              สำรวจที่พักยอดนิยม
            </h1>
            <p className="text-gray-600 mt-2">
              ค้นหาที่พักที่เหมาะกับสไตล์การเดินทางของคุณ
            </p>
          </div>

          {/* Grid System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-yellow-600 shadow">
                    ★ {item.rating}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    {item.location}
                  </p>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ฿{item.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm"> /คืน</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
