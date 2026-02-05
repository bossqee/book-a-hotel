import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown.jsx";

export default function Search_Bar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 👉 คลิกข้างนอกแล้วปิด
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-5xl">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl flex items-stretch p-2 border border-white/20">

        {/* ปลายทาง */}
        <div className="flex-1 flex flex-col px-6 py-3 hover:bg-black/5 rounded-xl">
          <span className="text-[12px] font-bold tracking-widest text-gray-500 mb-1">
            ปลายทาง
          </span>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-accent-gold mr-2">
              location_on
            </span>
            <input
              className="bg-transparent outline-none focus:outline-none text-sm w-full"
              placeholder="คุณต้องการไปที่ไหน?"
            />
          </div>
        </div>

        {/* วันที่ */}
        <button
          className="flex-1 flex flex-col px-6 py-3 hover:bg-black/5 rounded-xl
                     focus:outline-none focus:ring-0 active:outline-none"
        >
          <span className="text-[12px] font-bold tracking-widest text-gray-500 mb-1">
            เช็คอิน - เช็คเอาท์
          </span>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-accent-gold mr-2">
              calendar_month
            </span>
            <span className="text-sm">เพิ่มวันที่</span>
          </div>
        </button>

        {/* ห้องพัก & ผู้เข้าพัก */}
        <div ref={dropdownRef} className="relative flex-1">
          <button
            type="button"
            onClick={() => setOpenDropdown((v) => !v)}
            className="w-full flex flex-col px-6 py-3 hover:bg-black/5 rounded-xl
                       focus:outline-none focus:ring-0"
          >
            <span className="text-[12px] font-bold tracking-widest text-gray-500 mb-1">
              ห้องพัก & ผู้เข้าพัก
            </span>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-accent-gold mr-2">
                group
              </span>
              <span className="text-sm">2 ผู้ใหญ่ · 0 เด็ก · 1 ห้อง</span>
            </div>
          </button>

          {/* Dropdown */}
          {openDropdown && <Dropdown />}
        </div>

        {/* Search */}
        <div className="flex items-center ml-2">
          <button
            className="
              bg-primary text-white px-10 h-full rounded-xl font-bold
              flex items-center gap-2
              hover:bg-primary/90 active:scale-95
              transition-all duration-200
              focus:outline-none focus:ring-0
            "
          >
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>

      </div>
    </div>
  );
}
