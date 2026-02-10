import React, { useState, useEffect } from "react";
import Nav_Main from "../components/ui/Nav_Main";
import Footer from "../components/ui/Footer";
import { Trash2, Calendar, Users, Info, CreditCard } from "lucide-react";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myBookings") || "[]");
    setBookings(data);
  }, []);

  // ฟังก์ชันลบรายการจอง
  const handleDelete = (id) => {
    Swal.fire({
      title: "ยกเลิกการจอง?",
      text: "คุณต้องการยกเลิกรายการจองนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ยกเลิกเลย",
      cancelButtonText: "เก็บไว้ก่อน",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBookings = bookings.filter((b) => b.id !== id);
        setBookings(updatedBookings);
        localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
        Swal.fire("สำเร็จ!", "ยกเลิกรายการจองเรียบร้อยแล้ว", "success");
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      <main className="flex-grow pt-28 pb-16 px-4 md:px-10 max-w-[1200px] mx-auto w-full">
        {/* Header & Stats Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1128]">ประวัติการจองของฉัน</h1>
            <p className="text-gray-500 text-sm">จัดการและตรวจสอบสถานะการเข้าพักของคุณ</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 flex-1 md:w-32">
              <p className="text-xs text-gray-500 font-bold uppercase">ทั้งหมด</p>
              <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 flex-1 md:w-48">
              <p className="text-xs text-gray-500 font-bold uppercase">ยอดรวมที่ชำระ</p>
              <p className="text-2xl font-bold text-green-600">
                ฿{bookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">ยังไม่มีรายการจอง</h3>
            <p className="text-gray-500 mt-2">เริ่มวางแผนการเดินทางของคุณได้เลยวันนี้</p>
            <a href="/accommodations" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              ค้นหาที่พัก
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group flex flex-col md:flex-row border border-blue-100 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="w-full md:w-72 h-48 md:h-auto relative">
                  <img
                    src={booking.hotelImage}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    alt={booking.hotelName}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-md ${
                      booking.status === "Pending" 
                        ? "bg-yellow-500/90 text-white" 
                        : "bg-green-500/90 text-white"
                    }`}>
                      {booking.status === "Pending" ? "● รอการยืนยัน" : "● ยืนยันแล้ว"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1128] mb-2">{booking.hotelName}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-blue-500" />
                          <span className="font-medium">{booking.checkin}</span>
                          <span className="text-gray-400">ถึง</span>
                          <span className="font-medium">{booking.checkout}</span>
                          <span className="ml-2 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                             {booking.nights} คืน
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users size={16} className="text-blue-500" />
                          <span>ผู้ใหญ่: {booking.adults} • เด็ก: {booking.children}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                      title="ยกเลิกการจอง"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Info size={14} />
                      <span>ID: {booking.id}</span>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">ราคาสุทธิ</p>
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} className="text-green-600" />
                        <span className="text-2xl font-black text-[#0A1128]">
                          THB {Number(booking.totalPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
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

export default MyBookings;