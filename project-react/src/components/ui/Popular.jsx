import React from "react";
import { Data } from "../../data/Data";
import ScrollReveal from "../ScrollReveal";

const Popular = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto mt-14">
        <div className="mb-8 flex items-center justify-between space-x-4">
          <div className="text-left">
            <p className="text-[#C5A059]">
              ค้นหาที่พักที่เหมาะกับสไตล์การเดินทางของคุณ
            </p>
            <h1 className="text-3xl font-bold text-gray-800">
              สำรวจที่พักยอดนิยม
            </h1>
          </div>
          <div className="mt-12">
            <a
              class="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              href="Accommodations"
            >
              View All Accommodation{" "}
              <span class="material-symbols-outlined">arrow_right_alt</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
            >
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
  );
};

export default Popular;
