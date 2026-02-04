import React from "react";
import Search_Bar from "./Search_Bar.jsx";

const Title = () => {
  return (
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
    </div>
  );
};

export default Title;
