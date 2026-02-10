import React from "react";
import Nav_Main from "../components/ui/Nav_Main";
import Footer from "../components/ui/Footer";
import { products } from "../data/Product";
import { Star, MapPin, ChevronRight, Heart } from "lucide-react";

const Accommodations = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-16 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        
        {/* Header Section */}

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* LEFT SIDE: Filter Options */}
          <aside className="w-full md:w-1/4 space-y-6">
            {/* Map Preview */}
            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-gray-200 bg-blue-50 flex items-center justify-center group cursor-pointer">
                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d496933.3819845245!2d100.81870103834153!3d13.332100601313767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z4LiX4Li14LmI4Lie4Lix4LiB4LiB4Lij4Li44LiH4LmA4LiX4Lie!5e0!3m2!1sth!2sth!4v1770701875307!5m2!1sth!2sth" className="absolute inset-0 object-cover opacity-60 w-100 h-100"></iframe>
                <button className="relative bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg group-hover:bg-blue-700"><a href="https://maps.app.goo.gl/MjcWm4X8Xhxo7tfs9" className="text-white">แสดงแผนที่</a></button>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 space-y-6">
              <h2 className="font-bold text-gray-800 border-b pb-2">จำกัดการค้นหาด้วย:</h2>
              
              {/* Budget Filter */}
              <div>
                <p className="font-semibold text-sm mb-3">งบประมาณของท่าน (ต่อคืน)</p>
                <input type="range" className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>THB 200</span>
                  <span>THB 9,000+</span>
                </div>
              </div>

              {/* Checkbox Groups */}
              <div>
                <p className="font-semibold text-sm mb-3">เกณฑ์ค้นหายอดนิยม</p>
                {[ "5 ดาว", "รวมอาหารเช้า", "ดีมาก: 8+", "โรงแรม", "มีสระว่ายน้ำ" ,"วิลลา" ,"รีสอร์ท" ,"บ้านพักต่างอากาศ" ,"อพาร์ตเมนต์", "แคมป์" ].map((label) => (
                  <label key={label} className="flex items-center gap-3 mb-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Data List */}
          <section className="w-full md:w-3/4 space-y-4">
            
            {/* Sort Bar */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 w-fit text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
                <span>จัดเรียงตาม: ตัวเลือกที่จัดอันดับ</span>
            </div>

            {/* Product Cards */}
            {products.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row border border-blue-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white relative">
                
                {/* Image Section */}
                <div className="w-full sm:w-72 h-56 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="flex-grow p-5 flex flex-col md:flex-row justify-between">
                  
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-[#0A1128] hover:underline cursor-pointer">{item.name}</h3>
                        <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3">
                        <MapPin size={14} />
                        <span className="underline cursor-pointer">{item.location}</span>
                        <span className="text-gray-400 ml-2">แสดงบนแผนที่</span>
                    </div>

                    <div className="w-35 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md mb-3 uppercase">
                        {item.tag}
                    </div>

                    <p className="text-xs text-gray-600 border-l-2 border-gray-200 italic float-left pl-3">
                        {item.description}
                    </p>
                  </div>

                  {/* Pricing & Rating Section */}
                  <div className="md:w-1/3 flex flex-col justify-between items-end mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">ดีเลิศ</p>
                            <p className="text-[10px] text-gray-500">{item.reviews.toLocaleString()} ความคิดเห็น</p>
                        </div>
                        <div className="bg-white shadow text-yellow-600 w-14 h-8 flex items-center justify-center rounded-lg font-bold">
                           ★ {item.rating.toFixed(1)}
                        </div>
                        
                    </div>

                    <div className="text-right mt-4">
                        <p className="text-[10px] text-gray-400">1 คืน, ผู้ใหญ่ 2 ท่าน</p>
                        <p className="text-xs text-red-500 line-through">THB {item.oldPrice.toLocaleString()}</p>
                        <p className="text-2xl font-bold text-gray-900 leading-tight font-sans">THB {item.price.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500 mb-3">รวมภาษีและค่าธรรมเนียมแล้ว</p>
                        
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-1 transition-all">
                            จองเลยตอนนี้ <ChevronRight size={18} />
                        </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accommodations;