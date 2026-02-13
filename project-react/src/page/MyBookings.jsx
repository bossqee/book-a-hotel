import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("myBookings") || "[]");
      // ใช้ reverse() เพื่อเอาการจองล่าสุดขึ้นก่อน
      setBookings([...data].reverse());
    };

    loadData();

    const handleStorageChange = (e) => {
      if (e.key === "myBookings") loadData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleReview = (hotelName) => {
    Swal.fire({
      title: `รีวิวความประทับใจที่\n${hotelName}`,
      input: "textarea",
      inputLabel: "บอกต่อประสบการณ์ของคุณ...",
      inputPlaceholder: "ประทับใจการบริการหรือที่พักอย่างไรบ้าง...",
      showCancelButton: true,
      confirmButtonText: "ส่งรีวิวสุดประทับใจ",
      confirmButtonColor: "#2563eb",
      cancelButtonText: "ไว้คราวหลัง",
      customClass: {
        container: "font-sans",
        popup: "rounded-[2rem]",
      },
      preConfirm: (text) => {
        if (!text) {
          Swal.showValidationMessage("กรุณาพิมพ์ข้อความรีวิวสักนิด");
        }
        return text;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "ขอบคุณสำหรับรีวิว!",
          text: "รีวิวของคุณถูกบันทึกเรียบร้อยแล้ว",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans">
      <main className="pt-32 pb-20 px-4 md:px-10 max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              การจองของฉัน
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              จัดการทริปและเก็บความทรงจำที่แสนพิเศษของคุณ
            </p>
          </div>
          <button
            onClick={() => navigate("/accommodations")}
            className="group flex items-center gap-3 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            กลับไปหน้าค้นหา
          </button>
        </div>

        {/* Booking Cards List */}
        <div className="space-y-8">
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/40 hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-72 h-60 md:h-auto relative overflow-hidden">
                    <img
                      src={item.hotelImage}
                      alt={item.hotelName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5">
                      <StatusTag status={item.status || "Pending"} />
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative">
                    <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none text-slate-900">
                      <Ticket size={120} />
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {item.hotelName}
                          </h2>
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                              {item.location || "Premium Location"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                            Total Price
                          </p>
                          <span className="text-2xl font-black text-blue-600">
                            ฿{Number(item.totalPrice)?.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-slate-50">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            วันที่เข้าพัก
                          </p>
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                            <Calendar size={16} className="text-blue-500" />
                            {item.checkin}
                          </div>
                        </div>

                        <div className="space-y-1 border-x border-slate-50 px-6">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            จำนวนผู้เข้าพัก
                          </p>
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                            <Users size={16} className="text-blue-500" />
                            {/* แก้ไขเป็น Number() เพื่อป้องกันการต่อ String */}
                            {Number(item.adults || 0) +
                              Number(item.children || 0)}{" "}
                            ท่าน
                          </div>
                        </div>

                        <div className="space-y-1 hidden md:block pl-6">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            รหัสการจอง
                          </p>
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-tighter">
                            #{item.id?.toString().slice(-8)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${item.status === "Paid & Completed" ? "bg-emerald-500" : "bg-blue-500 animate-pulse"}`}
                        ></div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                          {item.status === "Paid & Completed"
                            ? "ทริปนี้เสร็จสมบูรณ์แล้ว"
                            : "เตรียมตัวให้พร้อมสำหรับการเดินทาง"}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        {item.status === "Paid & Completed" && (
                          <button
                            onClick={() => handleReview(item.hotelName)}
                            className="flex items-center gap-2 bg-amber-50 text-amber-600 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-amber-100 hover:shadow-lg hover:shadow-amber-200/30 transition-all active:scale-95 border border-amber-200/50"
                          >
                            <Star size={14} fill="currentColor" />
                            ให้คะแนนทริปนี้
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Luxury Empty State */
            <div className="bg-white border border-slate-100 rounded-[3rem] py-24 px-6 text-center shadow-xl shadow-slate-200/50">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Ticket size={48} className="text-slate-300 -rotate-12" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                ยังไม่มีแผนการเดินทาง?
              </h3>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">
                โลกใบใหญ่กำลังรอให้คุณไปสัมผัส
                เริ่มต้นทริปใหม่ของคุณได้เพียงไม่กี่คลิก
              </p>
              <button
                onClick={() => navigate("/accommodations")}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
              >
                ค้นหาที่พักที่ถูกใจ
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatusTag = ({ status }) => {
  const configs = {
    Pending: {
      text: "กำลังตรวจสอบ",
      icon: <Clock size={12} />,
      style: "bg-orange-500 text-white shadow-orange-200",
    },
    Confirmed: {
      text: "ยืนยันแล้ว",
      icon: <CheckCircle2 size={12} />,
      style: "bg-blue-600 text-white shadow-blue-200",
    },
    "Paid & Completed": {
      text: "เช็คอินเรียบร้อย",
      icon: <Star size={12} fill="currentColor" />,
      style: "bg-emerald-500 text-white shadow-emerald-200",
    },
    Cancelled: {
      text: "ยกเลิกแล้ว",
      icon: <Ticket size={12} />,
      style: "bg-slate-500 text-white shadow-slate-200",
    },
  };

  const config = configs[status] || configs.Pending;

  return (
    <div
      className={`backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20 ${config.style}`}
    >
      {config.icon}
      {config.text}
    </div>
  );
};

export default MyBookings;
