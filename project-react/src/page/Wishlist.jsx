import React, { useState, useEffect } from "react";
import Nav_Main from "../components/ui/Nav_Main";
import Footer from "../components/ui/Footer";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Wishlist = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myFavorites") || "[]");
    setFavs(data);
  }, []);

  const removeFav = (id) => {
    const updated = favs.filter(item => item.id !== id);
    setFavs(updated);
    localStorage.setItem("myFavorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow pt-28 pb-16 px-4 md:px-10 max-w-[1200px] mx-auto w-full">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#0A1128]">รายการโปรดของฉัน</h1>
          <p className="text-gray-500 mt-2">ที่พักที่คุณสนใจและบันทึกไว้ดูภายหลัง</p>
        </div>

        {favs.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={60} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">ยังไม่มีรายการโปรด</p>
            <Link to="/Accommodations" className="text-blue-600 underline text-sm mt-2 block">ไปเลือกที่พักที่ชอบกันเลย</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favs.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-48 relative">
                  <img src={item.image} className="w-full h-full object-cover" alt="" />
                  <button 
                    onClick={() => removeFav(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 shadow-md"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.location}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-blue-600">฿{item.price.toLocaleString()}</p>
                    <Link to="/Accommodations" className="text-xs font-bold flex items-center gap-1 text-gray-400 hover:text-[#0A1128]">
                      จองที่พักนี้ <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;