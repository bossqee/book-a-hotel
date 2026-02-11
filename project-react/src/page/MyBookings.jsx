import React, { useState, useEffect } from "react";
import { 
  Calendar, MapPin, Users, Ticket, 
  CheckCircle2, Clock, ChevronRight, ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router";
import Nav_Main from "../components/ui/Nav_Main";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลการจองล่าสุดจาก localStorage
    const data = JSON.parse(localStorage.getItem("myBookings") || "[]");
    setBookings(data.reverse()); // เอาอันล่าสุดขึ้นก่อน
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Nav_Main />
      
      <main className="pt-28 pb-16 px-4 md:px-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">การจองของฉัน</h1>
            <p className="text-slate-500 font-medium">ติดตามสถานะและดูรายละเอียดการเข้าพัก</p>
          </div>
          <button 
            onClick={() => navigate("/accommodations")}
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} /> กลับไปหน้าค้นหา
          </button>
        </div>

        {/* Booking List */}
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <div key={item.id} className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  
                  {/* Image Section */}
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img src={item.hotelImage} alt={item.hotelName} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <StatusTag status={item.status || "Pending"} />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-black text-slate-900 leading-tight">{item.hotelName}</h2>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          THB {item.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-3 mt-4">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-medium">{item.checkin} - {item.checkout}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Users size={16} className="text-slate-400" />
                          <span className="font-medium">{item.adults} ผู้ใหญ่, {item.children} เด็ก</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm col-span-2">
                          <Ticket size={16} className="text-slate-400" />
                          <span className="font-bold text-slate-700">Booking ID: #{item.id.toString().slice(-8).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ชำระเงินที่พัก</p>
                        <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ไม่ต้องใช้บัตรเครดิต</p>
                      </div>
                      <button className="flex items-center gap-1 text-sm font-black text-slate-900 group-hover:gap-2 transition-all">
                        ดูรายละเอียดแผนที่ <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[40px] py-20 px-6 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket size={40} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">คุณยังไม่มีรายการจอง</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">ออกไปค้นหาที่พักที่ถูกใจ แล้วเริ่มออกเดินทางไปกับเราเลย!</p>
              <button 
                onClick={() => navigate("/accommodations")}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:scale-105 transition-all"
              >
                เริ่มจองที่พักเลย
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Component สถานะแบบพรีเมียม
const StatusTag = ({ status }) => {
  const configs = {
    Pending: { 
      text: "รอดำเนินการ", 
      icon: <Clock size={12}/>, 
      style: "bg-white/90 text-orange-600" 
    },
    Confirmed: { 
      text: "จองสำเร็จ", 
      icon: <CheckCircle2 size={12}/>, 
      style: "bg-green-500/90 text-white" 
    },
    "Paid & Completed": { 
      text: "เข้าพักเรียบร้อย", 
      icon: <CheckCircle2 size={12}/>, 
      style: "bg-blue-600/90 text-white" 
    },
    Cancelled: { 
      text: "ยกเลิกแล้ว", 
      icon: <Ticket size={12}/>, 
      style: "bg-red-500/90 text-white" 
    },
  };

  const config = configs[status] || configs.Pending;

  return (
    <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-[11px] font-black uppercase tracking-wider shadow-lg ${config.style}`}>
      {config.icon}
      {config.text}
    </div>
  );
};

export default MyBookings;