import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Trash2,
  XCircle
} from "lucide-react";
import Swal from "sweetalert2"; // อย่าลืมติดตั้ง npm install sweetalert2

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, pendingBookings: 0, totalGuests: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("myBookings") || "[]");
    setBookings(data);

    // คำนวณรายได้เฉพาะที่ Confirmed แล้ว (สมมติว่าถ้าไม่มี status คือยังไม่จ่าย)
    const revenue = data.reduce((sum, item) => item.status === "Confirmed" ? sum + (item.totalPrice || 0) : sum, 0);
    const guests = data.reduce((sum, item) => sum + Number(item.adults || 0) + Number(item.children || 0), 0);
    const pending = data.filter(item => item.status === "Pending" || !item.status).length;
    
    setStats({
      totalRevenue: revenue,
      pendingBookings: pending,
      totalGuests: guests
    });
  };

  // ฟังก์ชันเปลี่ยนสถานะการจอง
  const updateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem("myBookings", JSON.stringify(updated));
    setBookings(updated);
    loadData(); // รีโหลดสถิติใหม่

    Swal.fire({
      icon: 'success',
      title: 'อัปเดตสถานะสำเร็จ',
      text: `รายการจองนี้ถูกเปลี่ยนเป็น ${newStatus}`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const deleteBooking = (id) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ข้อมูลการจองจะถูกลบออกจากระบบถาวร!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = bookings.filter(b => b.id !== id);
        localStorage.setItem("myBookings", JSON.stringify(updated));
        setBookings(updated);
        loadData();
        Swal.fire('ลบแล้ว!', 'ข้อมูลการจองถูกลบออกแล้ว.', 'success');
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-14 pb-16 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <LayoutDashboard className="text-blue-600" size={32} />
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">จัดการการจองและดูภาพรวมธุรกิจของคุณ</p>
        </header>

        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-green-100 p-4 rounded-2xl text-green-600"><DollarSign size={28} /></div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">รายได้ที่ยืนยันแล้ว</p>
              <h2 className="text-2xl font-black text-gray-900">฿{stats.totalRevenue.toLocaleString()}</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Clock size={28} /></div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">รอยืนยันการชำระ</p>
              <h2 className="text-2xl font-black text-gray-900">{stats.pendingBookings} รายการ</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-purple-100 p-4 rounded-2xl text-purple-600"><Users size={28} /></div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">จำนวนแขกสะสม</p>
              <h2 className="text-2xl font-black text-gray-900">{stats.totalGuests} ท่าน</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT: BOOKINGS TABLE --- */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">รายการจองล่าสุด</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">ที่พัก / ID</th>
                    <th className="px-6 py-4">วันที่เข้าพัก</th>
                    <th className="px-6 py-4">ยอดรวม</th>
                    <th className="px-6 py-4">สถานะ</th>
                    <th className="px-6 py-4 text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={item.hotelImage} className="w-12 h-12 rounded-xl object-cover" alt="" />
                          <div>
                            <span className="font-bold text-sm text-gray-800 block">{item.hotelName}</span>
                            <span className="text-[10px] text-gray-400">ID: #{item.id.toString().slice(-6)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-gray-600">{item.checkin}</p>
                        <p className="text-[10px] text-gray-400 italic">รวม {item.nights} คืน</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-blue-600 text-sm">
                        ฿{item.totalPrice?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-md w-fit 
                          ${item.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 
                            item.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-500'}`}>
                          {item.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* ปุ่มยืนยัน */}
                          <button onClick={() => updateStatus(item.id, "Confirmed")} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-all" title="Confirm Booking">
                            <CheckCircle size={18} />
                          </button>
                          {/* ปุ่มยกเลิก */}
                          <button onClick={() => updateStatus(item.id, "Cancelled")} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-all" title="Cancel Booking">
                            <XCircle size={18} />
                          </button>
                          {/* ปุ่มลบ */}
                          <button onClick={() => deleteBooking(item.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- RIGHT: DONUT CHART --- */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center h-fit">
            <h3 className="font-bold text-lg text-gray-900 w-full text-left mb-8">วิเคราะห์สัดส่วน</h3>
            
            <div className="relative flex items-center justify-center mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#f3f4f6" strokeWidth="20" fill="transparent" />
                <circle cx="96" cy="96" r="80" stroke="#3b82f6" strokeWidth="20" fill="transparent" 
                  strokeDasharray="502" strokeDashoffset={502 - (502 * 0.75)} strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-gray-900">75%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Occupancy</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-bold text-gray-700 font-sans">โรงแรม & รีสอร์ท</span>
                </div>
                <span className="text-sm font-black text-blue-600">75%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-bold text-gray-500 font-sans">วิลล่า & แคมป์ปิ้ง</span>
                </div>
                <span className="text-sm font-black text-gray-400">25%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;