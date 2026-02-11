import React, { useState } from "react"; // 1. เพิ่ม useState ในการ import
import Nav_Main from "../components/ui/Nav_Main";
import Footer from "../components/ui/Footer";
import { products } from "../data/Product";
import { Star, MapPin, ChevronRight, Heart, Search } from "lucide-react"; // 2. เพิ่ม Search icon
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { motion, AnimatePresence } from "framer-motion";

const Accommodations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedTags, setSelectedTags] = useState([]);

  // --- 3. เพิ่มฟังก์ชันจัดการการคลิก Tag/Checkbox ที่คุณยังไม่มี ---
  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesTags =
      selectedTags.length === 0 || selectedTags.includes(item.tag);
    return matchesSearch && matchesPrice && matchesTags;
  });

  // ... (ฟังก์ชัน toggleFavorite และ handleBooking ของคุณเหมือนเดิมเป๊ะ) ...
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("myFavorites") || "[]"),
  );
  const toggleFavorite = (item) => {
    const existingFavorites = JSON.parse(
      localStorage.getItem("myFavorites") || "[]",
    );
    const isExist = existingFavorites.find((fav) => fav.id === item.id);
    let updatedFavorites;
    if (isExist) {
      updatedFavorites = existingFavorites.filter((fav) => fav.id !== item.id);
    } else {
      updatedFavorites = [...existingFavorites, item];
    }
    localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleBooking = (item) => {
    // ... (โค้ด handleBooking เดิมของคุณทั้งหมด) ...
    Swal.fire({
      title: `<div class="text-xl font-bold text-navy-deep">จองที่พัก: ${item.name}</div>`,
      icon: "info",
      html: `
    <div class="flex flex-col gap-4 text-left p-2 font-sans">
      <div>
        <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">เลือกวันที่เข้าพัก - ออก</label>
        <input type="text" id="date-range" class="swal2-input !m-0 !w-full !text-sm cursor-pointer" placeholder="คลิกเพื่อเลือกวันที่" readonly>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">ผู้ใหญ่</label>
          <div class="flex items-center border border-gray-300 rounded-lg mt-1">
             <input type="number" id="adults" class="swal2-input !border-0 !m-0 !w-full !text-center" value="2" min="1">
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">เด็ก</label>
          <div class="flex items-center border border-gray-300 rounded-lg mt-1">
             <input type="number" id="children" class="swal2-input !border-0 !m-0 !w-full !text-center" value="0" min="0">
          </div>
        </div>
      </div>
      <p class="text-[10px] text-blue-500 italic">* ราคา THB ${item.price.toLocaleString()} ต่อคืน</p>
    </div>
  `,
      didOpen: () => {
        flatpickr("#date-range", {
          mode: "range",
          minDate: "today",
          dateFormat: "Y-m-d",
          locale: { rangeSeparator: "  ถึง  " },
        });
      },
      showCancelButton: true,
      confirmButtonText: "ยืนยันการจอง",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#007b40",
      preConfirm: () => {
        const dateRange = Swal.getPopup().querySelector("#date-range").value;
        const adults = Swal.getPopup().querySelector("#adults").value;
        const children = Swal.getPopup().querySelector("#children").value;

        if (!dateRange || !dateRange.includes(" ถึง ")) {
          Swal.showValidationMessage(`กรุณาเลือกทั้งวันที่เช็คอินและเช็คเอาท์`);
          return false;
        }

        const dates = dateRange.split("  ถึง  ");
        const checkin = dates[0].trim();
        const checkout = dates[1].trim();

        const diffInMs = new Date(checkout) - new Date(checkin);
        const nights = Math.max(1, diffInMs / (1000 * 60 * 60 * 24));

        return { checkin, checkout, adults, children, nights };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const totalAmount = item.price * result.value.nights;
        const newBooking = {
          id: Date.now(),
          hotelName: item.name,
          hotelImage: item.image,
          checkin: result.value.checkin,
          checkout: result.value.checkout,
          adults: result.value.adults,
          children: result.value.children,
          nights: result.value.nights,
          totalPrice: totalAmount,
          status: "Pending",
        };

        const existingBookings = JSON.parse(
          localStorage.getItem("myBookings") || "[]",
        );
        localStorage.setItem(
          "myBookings",
          JSON.stringify([...existingBookings, newBooking]),
        );

        Swal.fire({
          title: "จองสำเร็จ!",
          text: `ราคารวมสำหรับ ${result.value.nights} คืนคือ THB ${totalAmount.toLocaleString()}`,
          icon: "success",
          confirmButtonColor: "#0a192f",
        });
      }
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow pt-28 pb-16 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT SIDE: (Layout ที่คุณเลือกมา ผมใส่ onChange ให้แล้ว) */}
          <aside className="w-full md:w-1/4 space-y-6">
            <div className="relative h-38 w-full rounded-xl overflow-hidden border border-gray-200 bg-blue-50 flex items-center justify-center group cursor-pointer">
              {/* ส่วนของ Iframe สำหรับแสดงหน้าแมพเบื้องต้น */}
              <iframe
                title="map-preview"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124015.49818128222!2d100.4490529!3d13.7485306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok!5e0!3m2!1sen!2sth!4v1715600000000!5m2!1sen!2sth"
                className="absolute inset-0 object-cover opacity-60 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>

              {/* ปุ่มสำหรับกดเปิด Google Maps หน้าใหม่ */}
              <button className="relative bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all hover:bg-blue-700 active:scale-95 z-10">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=hotels+in+Bangkok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-2"
                >
                  <MapPin size={16} />
                  แสดงแผนที่
                </a>
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-24 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-50">
                <h2 className="font-bold text-lg text-gray-900">ตัวกรอง</h2>
                {(searchQuery ||
                  selectedTags.length > 0 ||
                  maxPrice < 15000) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTags([]);
                      setMaxPrice(15000);
                    }}
                    className="text-xs text-red-500 font-semibold px-2 py-1 rounded-lg transition-colors"
                  >
                    ล้างค่า
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700">
                  ค้นหาชื่อที่พัก
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="ระบุชื่อโรงแรม..."
                    className="w-full p-3 pl-10 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700">
                    งบประมาณต่อคืน
                  </label>
                  <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    ฿{maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">
                  ประเภทที่พัก
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {["5 ดาว", "โรงแรม", "วิลลา", "รีสอร์ท", "แคมป์"].map(
                    (label) => (
                      <label
                        key={label}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedTags.includes(label) ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500" : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(label)}
                            onChange={() => handleTagChange(label)}
                            className="hidden"
                          />
                          <span
                            className={`text-sm font-medium ${selectedTags.includes(label) ? "text-blue-700" : "text-gray-600"}`}
                          >
                            {label}
                          </span>
                        </div>
                        {selectedTags.includes(label) && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                        )}
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: (UI เดิมของคุณเป๊ะๆ แค่เปลี่ยน products.map เป็น filteredProducts.map) */}
          <section className="w-full md:w-3/4 space-y-4">
            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 w-fit text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
              <span>จัดเรียงตาม: ตัวเลือกที่จัดอันดับ</span>
            </div>

            {/* --- เปลี่ยนเป็น filteredProducts.map เพื่อให้ผลการกรองทำงาน --- */}
            {filteredProducts.map((item) => (
              <motion.div
                key={item.id} // สำคัญมาก: key ต้องนิ่งเพื่อให้ animation รู้ว่าตัวไหนมาหรือไป
                layout // 3. เพิ่ม layout เพื่อให้การ์ดที่เหลือเลื่อนขึ้นมาแทนที่กันแบบสมูท
                initial={{ opacity: 0, y: 20 }} // เริ่มต้น: จางและอยู่ต่ำลงไปหน่อย
                animate={{ opacity: 1, y: 0 }} // ปรากฏ: ชัดเจนและเลื่อนขึ้นมาที่เดิม
                exit={{ opacity: 0, scale: 0.95 }} // ตอนหายไป: จางลงและย่อตัวเล็กน้อย
                transition={{ duration: 0.3 }} // ความเร็วของ Animation
              >
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row border border-blue-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white relative"
                >
                  <div className="w-full sm:w-72 h-56 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full transition-colors shadow-sm"
                    >
                      <Heart
                        size={20}
                        className={
                          favorites.some((f) => f.id === item.id)
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }
                      />
                    </button>
                  </div>
                  <div className="flex-grow p-5 flex flex-col md:flex-row justify-between">
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-[#0A1128] hover:underline cursor-pointer">
                          {item.name}
                        </h3>
                        <div className="flex text-yellow-400">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3">
                        <MapPin size={14} />
                        <span className="underline cursor-pointer">
                          {item.location}
                        </span>
                        <span className="text-gray-400 ml-2">แสดงบนแผนที่</span>
                      </div>
                      <div className="w-35 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md mb-3 uppercase">
                        {item.tag}
                      </div>
                      <p className="text-xs text-gray-600 border-l-2 border-gray-200 italic float-left pl-3">
                        {item.description}
                      </p>
                    </div>
                    <div className="md:w-1/3 flex flex-col justify-between items-end mt-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">
                            ดีเลิศ
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {item.reviews.toLocaleString()} ความคิดเห็น
                          </p>
                        </div>
                        <div className="bg-white shadow text-yellow-600 w-14 h-8 flex items-center justify-center rounded-lg font-bold">
                          ★ {item.rating.toFixed(1)}
                        </div>
                      </div>
                      <div className="text-right mt-4">
                        <p className="text-[10px] text-gray-400">
                          1 คืน, ผู้ใหญ่ 2 ท่าน
                        </p>
                        <p className="text-xs text-red-500 line-through">
                          THB {item.oldPrice.toLocaleString()}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 leading-tight font-sans">
                          THB {item.price.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-500 mb-3">
                          รวมภาษีและค่าธรรมเนียมแล้ว
                        </p>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-1 transition-all shadow-md active:scale-95"
                          onClick={() => handleBooking(item)}
                        >
                          จองเลยตอนนี้ <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Search size={40} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  ไม่พบที่พักที่คุณต้องการ
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  ลองปรับเปลี่ยนตัวกรอง หรือค้นหาด้วยชื่ออื่นดูนะ
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setMaxPrice(15000);
                    setSelectedTags([]);
                  }}
                  className="mt-6 text-blue-600 font-bold "
                >
                  ล้างค่าการกรองทั้งหมด
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accommodations;
