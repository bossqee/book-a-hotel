import React from "react";
import "../App.css";
import Nav_Main from "../components/ui/Nav_Main.jsx";

const Home = () => {
  return (
    <div className="absolute inset-0 bg-cover bg-center home-background">
      <Nav_Main />
      <div className="flex justify-center items-center h-screen flex-col gap-4 text-center px-4">
        <h1 className="text-4xl font-bold title-white">Your Gateway to the</h1>
        <h1 className="text-4xl font-bold title-yellow">Extraordinary</h1>
        <p className="title-p">
          สัมผัสประสบการณ์ความหรูหราและความสะดวกสบายอย่างที่ไม่เคยมีมาก่อน —
          การเข้าพักที่สมบูรณ์แบบของคุณเริ่มต้นที่นี่
        </p>
        <form action="">
          <input
            type="text"
            className="search-input outline w-100 h-12 rounded-md transition-all shadow-lg text-white p-4"
            placeholder="Search for hotels..."
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
