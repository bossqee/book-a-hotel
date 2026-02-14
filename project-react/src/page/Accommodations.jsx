import React, { useState, useEffect } from "react"; // 1. เพิ่ม useState ในการ import
import Footer from "../components/ui/Footer";
import { products } from "../data/Product";
import { Star, MapPin, ChevronRight, Heart, Search } from "lucide-react"; // 2. เพิ่ม Search icon
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { motion, AnimatePresence } from "framer-motion";

const Accommodations = () => {
  // --- 1. ย้าย States ทั้งหมดมาไว้ตรงนี้ (บนสุดของ Component) ---
  const [displayProducts, setDisplayProducts] = useState([]);
  const [adminCategories, setAdminCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [selectedTags, setSelectedTags] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("myFavorites") || "[]"),
  );

  // --- 2. ฟังก์ชันโหลดข้อมูล (คง Logic เดิมของคุณไว้) ---
  const loadData = () => {
    const adminData = JSON.parse(
      localStorage.getItem("admin_products") || "[]",
    );
    if (adminData.length > 0) {
      setDisplayProducts(adminData);
    } else {
      const initialData = products.map((p) => ({
        ...p,
        availableRooms: p.availableRooms || 10,
      }));
      setDisplayProducts(initialData);
      localStorage.setItem("admin_products", JSON.stringify(initialData));
    }

    const savedCats = JSON.parse(localStorage.getItem("categories") || "[]");
    setAdminCategories(
      savedCats.length > 0
        ? savedCats
        : [
            { id: 1, name: "โรงแรม" },
            { id: 2, name: "วิลลา" },
            { id: 3, name: "รีสอร์ท" },
          ],
    );
  };

  // --- 3. useEffect คุมการโหลดและการ Sync ---
  useEffect(() => {
    loadData();

    const syncData = (e) => {
      if (e.key === "admin_products") {
        const updated = JSON.parse(e.newValue);
        if (updated) setDisplayProducts(updated);
      }
    };
    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  // --- 4. ฟังก์ชันจัดการสต็อก ---
  const updateStock = (hotelId, roomsToBook) => {
    const currentData = JSON.parse(
      localStorage.getItem("admin_products") || "[]",
    );
    const updatedData = currentData.map((item) => {
      if (item.id === hotelId) {
        return {
          ...item,
          availableRooms: Math.max(0, item.availableRooms - roomsToBook),
        };
      }
      return item;
    });
    localStorage.setItem("admin_products", JSON.stringify(updatedData));
    setDisplayProducts(updatedData);
  };

  // --- 5. Logic การกรองข้อมูล ---
  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProducts = displayProducts.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesTags =
      selectedTags.length === 0 || selectedTags.includes(item.tag);
    return matchesSearch && matchesPrice && matchesTags;
  });

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

  // --- 6. ฟังก์ชันการจองและบันทึกลง LocalStorage (Logic เดิมของคุณ) ---
  const saveToLocalStorage = (item, data, total, method, slip = null) => {
    const finalBooking = {
      id: Date.now(),
      hotelName: item.name,
      hotelImage: item.image,
      ...data,
      totalPrice: total,
      paymentMethod: method,
      slipImage: slip,
      status: "Pending",
      bookingDate: new Date().toLocaleString(),
    };
    const existing = JSON.parse(localStorage.getItem("myBookings") || "[]");
    localStorage.setItem(
      "myBookings",
      JSON.stringify([...existing, finalBooking]),
    );
    Swal.fire("สำเร็จ!", "บันทึกการจองของคุณแล้ว", "success");
  };

  const handleBooking = (item) => {
    // เช็คก่อนว่าห้องเต็มหรือยัง
    if (item.availableRooms <= 0) {
      Swal.fire("ขออภัย", "ที่พักนี้ถูกจองเต็มแล้ว", "error");
      return;
    }

    let timerInterval;
    const totalSeconds = 300;
    Swal.fire({
      width: "550px",
      padding: "1.5rem",
      html: `
        <h1>ยืนยันการจอง</h1>
        <div class="flex flex-col gap-5 text-left font-sans mt-6">
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <label class="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> ข้อมูลผู้ติดต่อ
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="space-y-1">
                <p class="text-[10px] font-bold text-slate-400 ml-1">ชื่อ-นามสกุล</p>
                <input type="text" id="guestName" class="swal2-input !m-0 !w-full !text-sm !rounded-xl !border-slate-200 focus:!border-blue-500 shadow-sm" placeholder="เช่น นายสมชาย ใจดี">
              </div>
              <div class="space-y-1">
                <p class="text-[10px] font-bold text-slate-400 ml-1">เบอร์โทรศัพท์</p>
                <input type="tel" id="phone" class="swal2-input !m-0 !w-full !text-sm !rounded-xl !border-slate-200 focus:!border-blue-500 shadow-sm" placeholder="08x-xxx-xxxx">
              </div>
            </div>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
             <div class="space-y-1">
                <label class="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> ระยะเวลาการเข้าพัก
                </label>
                <input type="text" id="date-range" class="swal2-input !m-0 !w-full !text-sm !rounded-xl !border-slate-200 cursor-pointer bg-blue-50/30" placeholder="เลือกวันที่เช็คอิน - เช็คเอาท์" readonly>
             </div>
             <div class="grid grid-cols-3 gap-3 pt-2">
                <div class="space-y-1">
                  <p class="text-[10px] font-black text-slate-500 uppercase">จำนวนห้อง (เหลือ ${item.availableRooms})</p>
                  <input type="number" id="roomCount" class="swal2-input !m-0 !w-full !text-sm !rounded-xl !text-center bg-slate-50" value="1" min="1" max="${item.availableRooms}">
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] font-black text-slate-500 uppercase">ผู้ใหญ่ <span class="text-blue-500">(12ปี+)</span></p>
                  <input type="number" id="adults" class="swal2-input !m-0 !w-full !text-sm !rounded-xl !text-center bg-slate-50" value="2" min="1">
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] font-black text-slate-500 uppercase">เด็ก <span class="text-blue-500">(0-11ปี)</span></p>
                  <input type="number" id="children" class="swal2-input !m-0 !w-full !text-sm !rounded-xl !text-center bg-slate-50" value="0" min="0">
                </div>
             </div>
          </div>
          <div class="space-y-3">
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">เลือกช่องทางการชำระเงิน</p>
            <div class="grid grid-cols-2 gap-3">
               <label class="relative group cursor-pointer">
                  <input type="radio" name="pay-method" value="Pay Now" class="peer hidden" checked>
                  <div class="p-4 border-2 border-slate-100 rounded-2xl transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 group-hover:bg-slate-50">
                     <div class="flex flex-col items-center gap-1">
                        <span class="text-sm font-black text-slate-700 peer-checked:text-blue-700">โอนเงินทันที</span>
                        <span class="text-[9px] text-slate-400 font-bold uppercase">PromptPay / Slip</span>
                     </div>
                  </div>
               </label>
               <label class="relative group cursor-pointer">
                  <input type="radio" name="pay-method" value="Pay Later" class="peer hidden">
                  <div class="p-4 border-2 border-slate-100 rounded-2xl transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 group-hover:bg-slate-50">
                     <div class="flex flex-col items-center gap-1">
                        <span class="text-sm font-black text-slate-700">จ่ายเมื่อเข้าพัก</span>
                        <span class="text-[9px] text-slate-400 font-bold uppercase">Check-in Payment</span>
                     </div>
                  </div>
               </label>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'ดำเนินการต่อ <span class="ml-2">→</span>',
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#f1f5f9",
      customClass: {
        confirmButton:
          "!rounded-xl !px-10 !py-3 !text-sm !font-bold shadow-lg shadow-blue-200",
        cancelButton: "!rounded-xl !text-slate-400 !text-sm !font-bold",
        popup: "!rounded-[32px]",
      },
      didOpen: () => {
        flatpickr("#date-range", {
          mode: "range",
          minDate: "today",
          dateFormat: "Y-m-d",
          locale: { rangeSeparator: "  ถึง  " },
        });
      },
      preConfirm: () => {
        const guestName = Swal.getPopup().querySelector("#guestName").value;
        const phone = Swal.getPopup().querySelector("#phone").value;
        const dateRange = Swal.getPopup().querySelector("#date-range").value;
        const paymentMethod = Swal.getPopup().querySelector(
          'input[name="pay-method"]:checked',
        ).value;
        const roomCount = parseInt(
          Swal.getPopup().querySelector("#roomCount").value,
        );

        if (!guestName || !phone || !dateRange.includes(" ถึง ")) {
          Swal.showValidationMessage(
            `กรุณากรอกข้อมูลและเลือกวันเข้าพักให้ครบถ้วน`,
          );
          return false;
        }

        // เช็คสต็อกอีกรอบก่อนปิด Popup
        if (roomCount > item.availableRooms) {
          Swal.showValidationMessage(
            `เหลือห้องว่างเพียง ${item.availableRooms} ห้อง`,
          );
          return false;
        }

        const dates = dateRange.split("  ถึง  ");
        const nights = Math.max(
          1,
          (new Date(dates[1]) - new Date(dates[0])) / (1000 * 60 * 60 * 24),
        );

        return {
          guestName,
          phone,
          checkin: dates[0],
          checkout: dates[1],
          nights,
          roomCount,
          paymentMethod,
          adults: Swal.getPopup().querySelector("#adults").value,
          children: Swal.getPopup().querySelector("#children").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const totalAmount =
          item.price * result.value.nights * result.value.roomCount;
        if (result.value.paymentMethod === "Pay Now") {
          handlePaymentStep(item, result.value, totalAmount);
        } else {
          saveToLocalStorage(item, result.value, totalAmount, "Pay Later");
        }
      }
    });
  };

  const handlePaymentStep = (item, bookingData, totalAmount) => {
    let paymentTimer;
    const totalSeconds = 300;

    Swal.fire({
      title: "ชำระเงินผ่าน QR Code",
      width: "450px",
      html: `
        <div class="flex flex-col items-center gap-3 font-sans">
          <div class="w-full bg-red-50 p-2 rounded-xl border border-red-100 flex items-center justify-between px-4">
            <span class="text-red-600 text-[10px] font-black uppercase tracking-wider">ชำระเงินภายใน:</span>
            <b id="payment-timer" class="text-red-700 text-sm font-mono bg-white px-3 py-0.5 rounded-lg border border-red-200">05:00</b>
          </div>
          <div class="bg-blue-50 p-3 rounded-2xl w-full text-center">
            <p class="text-[11px] text-gray-500 font-bold uppercase">ยอดชำระทั้งหมด</p>
            <p class="text-3xl font-black text-blue-600">฿${totalAmount.toLocaleString()}</p>
          </div>
          <div class="relative group">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PromptPay_Payload_Here" 
                 className="w-44 h-44 border-4 border-white shadow-md rounded-xl" alt="QR Code" />
          </div>
          <div class="text-left w-full space-y-1 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p class="flex justify-between"><b>ธนาคาร:</b> <span>กสิกรไทย (K-Bank)</span></p>
            <p class="flex justify-between"><b>ชื่อบัญชี:</b> <span>บจก. จองที่พักไทย</span></p>
            <p class="flex justify-between"><b>เลขบัญชี:</b> <span>123-4-56789-0</span></p>
          </div>
          <div class="w-full text-left">
            <label class="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">อัปโหลดสลิปยืนยัน</label>
            <input type="file" id="slip-upload" accept="image/*" 
                   class="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"/>
          </div>
        </div>
      `,
      timer: totalSeconds * 1000,
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonText: "ยืนยันการแจ้งชำระเงิน",
      cancelButtonText: "ยกเลิกการจอง",
      confirmButtonColor: "#2563eb",
      customClass: {
        popup: "!rounded-[32px]",
        confirmButton: "!rounded-xl !text-sm !font-bold !px-8",
        cancelButton: "!rounded-xl !text-sm !font-bold",
      },
      didOpen: () => {
        const timerDisplay =
          Swal.getHtmlContainer().querySelector("#payment-timer");
        paymentTimer = setInterval(() => {
          const timeLeft = Swal.getTimerLeft();
          if (timeLeft && timerDisplay) {
            const min = Math.floor(timeLeft / 60000);
            const sec = Math.floor((timeLeft % 60000) / 1000);
            timerDisplay.textContent = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(paymentTimer);
      },
      preConfirm: () => {
        const fileInput = Swal.getPopup().querySelector("#slip-upload");
        if (!fileInput.files[0]) {
          Swal.showValidationMessage("กรุณาอัปโหลดสลิปก่อนยืนยัน");
          return false;
        }
        return fileInput.files[0];
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          icon: "error",
          title: "หมดเวลาชำระเงิน!",
          text: "รายการจองของคุณถูกยกเลิกเนื่องจากเกินเวลาที่กำหนด",
          confirmButtonColor: "#2563eb",
          customClass: { popup: "!rounded-[24px]" },
        });
      } else if (result.isConfirmed) {
        // สร้าง URL สำหรับรูปภาพสลิป
        const slipUrl = URL.createObjectURL(result.value);
        saveToLocalStorage(item, bookingData, totalAmount, "Pay Now", slipUrl); // บันทึกข้อมูล
      }
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow pt-28 pb-16 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-1/4 space-y-6">
            <div className="relative h-38 w-full rounded-xl overflow-hidden border border-gray-200 bg-blue-50 flex items-center justify-center group cursor-pointer">
              <iframe
                title="map-preview"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124015.49818128222!2d100.4490529!3d13.7485306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok!5e0!3m2!1sen!2sth!4v1715600000000!5m2!1sen!2sth"
                className="absolute inset-0 object-cover opacity-60 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <button className="relative bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all hover:bg-blue-700 active:scale-95 z-10">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=hotels+in+Bangkok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-2"
                >
                  <MapPin size={16} /> แสดงแผนที่
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
                  {adminCategories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedTags.includes(cat.name)
                          ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                          : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(cat.name)}
                          onChange={() => handleTagChange(cat.name)}
                          className="hidden"
                        />
                        <span
                          className={`text-sm font-medium ${selectedTags.includes(cat.name) ? "text-blue-700" : "text-gray-600"}`}
                        >
                          {cat.name}
                        </span>
                      </div>
                      {selectedTags.includes(cat.name) && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="w-full md:w-3/4 space-y-4">
            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 w-fit text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
              <span>จัดเรียงตาม: ตัวเลือกที่จัดอันดับ</span>
            </div>

            <AnimatePresence>
              {filteredProducts.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row border border-blue-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white relative">
                    <div className="w-full sm:w-72 h-56 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                      />
                      <button
                        onClick={() => toggleFavorite(item)}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm"
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
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3">
                          <MapPin size={14} />{" "}
                          <span className="underline">{item.location}</span>
                        </div>
                        <div className="w-35 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md mb-3 uppercase">
                          {item.tag}
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          {item.availableRooms > 0 ? (
                            <span className="text-[11px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                              ว่าง {item.availableRooms} ห้องสุดท้าย
                            </span>
                          ) : (
                            <span className="text-[11px] font-black bg-red-50 text-red-600 px-2 py-1 rounded-md border border-red-100 animate-pulse">
                              Sold Out - ห้องพักเต็มแล้ว
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 border-l-2 border-gray-200 italic pl-3">
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
                          <p className="text-xs text-red-500 line-through">
                            THB {item.oldPrice.toLocaleString()}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 leading-tight">
                            THB {item.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleBooking(item)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-1 mt-3"
                          >
                            จองเลยตอนนี้ <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <Search size={40} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">
                  ไม่พบที่พักที่คุณต้องการ
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setMaxPrice(15000);
                    setSelectedTags([]);
                  }}
                  className="mt-4 text-blue-600 font-bold"
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
