import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, ShoppingBag, Users, DollarSign, 
  CheckCircle, Clock, Trash2, XCircle, ChevronRight,
  TrendingUp, Hotel
} from "lucide-react";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, pendingBookings: 0, totalGuests: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("myBookings") || "[]");
    setBookings(data);

    const revenue = data.reduce((sum, item) => item.status === "Paid & Completed" ? sum + (item.totalPrice || 0) : sum, 0);
    const guests = data.reduce((sum, item) => sum + Number(item.adults || 0) + Number(item.children || 0), 0);
    const pending = data.filter(item => item.status === "Pending" || !item.status).length;
    
    setStats({ totalRevenue: revenue, pendingBookings: pending, totalGuests: guests });
  };

  const updateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem("myBookings", JSON.stringify(updated));
    setBookings(updated);
    loadData();
    Swal.fire({ icon: 'success', title: 'อัปเดตเรียบร้อย', showConfirmButton: false, timer: 1000 });
  };

  const deleteBooking = (id) => {
    Swal.fire({
      title: 'ลบรายการจอง?', text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้", icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#ef4444', confirmButtonText: 'ยืนยันการลบ'
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = bookings.filter(b => b.id !== id);
        localStorage.setItem("myBookings", JSON.stringify(updated));
        setBookings(updated);
        loadData();
      }
    });
  };

  // Logic สำหรับกราฟ (คำนวณจริง)
  const confirmedRatio = bookings.length > 0 ? Math.round((bookings.filter(b => b.status === "Confirmed").length / bookings.length) * 100) : 0;
  const strokeDashoffset = 502 - (502 * confirmedRatio) / 100;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans antialiased text-slate-900">
      <main className="pt-10 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                <LayoutDashboard size={24} />
              </div>
              Admin <span className="text-blue-600">Console</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1 ml-12">ภาพรวมและการจัดการข้อมูลการจองแบบ Real-time</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">Export CSV</button>
             <button className="bg-[#0f172a] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">เพิ่มการจองใหม่</button>
          </div>
        </header>

        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<DollarSign/>} label="รายได้สุทธิ (ที่รับเงินแล้ว)" value={`฿${stats.totalRevenue.toLocaleString()}`} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={<Clock/>} label="รอยืนยันการจอง" value={`${stats.pendingBookings} รายการ`} color="text-amber-600" bg="bg-amber-50" />
          <StatCard icon={<Users/>} label="ผู้เข้าพักสะสม" value={`${stats.totalGuests} ท่าน`} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- TABLE: BOOKINGS (75% width) --- */}
          <div className="lg:col-span-3 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
              <h3 className="font-bold text-xl text-slate-800">รายการธุรกรรมล่าสุด</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update: Just now</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-[11px] uppercase font-black tracking-[0.1em] border-b border-slate-50">
                    <th className="px-8 py-5">ที่พัก / รหัสการจอง</th>
                    <th className="px-8 py-5">ช่วงเวลาเข้าพัก</th>
                    <th className="px-8 py-5 text-right">ยอดรวม</th>
                    <th className="px-8 py-5 text-center">สถานะ</th>
                    <th className="px-8 py-5 text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img src={item.hotelImage} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt="" />
                            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-sm">
                              <Hotel size={10} className="text-blue-500" />
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-base block group-hover:text-blue-600 transition-colors">{item.hotelName}</span>
                            <span className="text-xs font-medium text-slate-400 mt-0.5 block tracking-wide uppercase">ID #{item.id.toString().slice(-6)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{item.checkin}</span>
                          <span className="text-[11px] text-slate-400 font-medium italic mt-1 flex items-center gap-1">
                             <Clock size={10}/> {item.nights} คืน
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="font-black text-slate-900 text-sm">฿{item.totalPrice?.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={item.status || "Pending"} />
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* ปุ่มอัจฉริยะ ปรับตามสถานะ */}
                          {(!item.status || item.status === "Pending") && (
                            <ActionButton onClick={() => updateStatus(item.id, "Confirmed")} icon={<CheckCircle size={16}/>} label="ยืนยัน" color="text-blue-600 hover:bg-blue-50" />
                          )}
                          {item.status === "Confirmed" && (
                            <ActionButton onClick={() => updateStatus(item.id, "Paid & Completed")} icon={<DollarSign size={16}/>} label="จ่ายแล้ว" color="text-emerald-600 hover:bg-emerald-50" />
                          )}
                          <ActionButton onClick={() => updateStatus(item.id, "Cancelled")} icon={<XCircle size={16}/>} label="ยกเลิก" color="text-rose-600 hover:bg-rose-50" />
                          <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
                          <ActionButton onClick={() => deleteBooking(item.id)} icon={<Trash2 size={16}/>} label="" color="text-slate-300 hover:text-rose-600 hover:bg-rose-50" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- RIGHT: ANALYTICS (25% width) --- */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col items-center">
              <h3 className="font-bold text-lg text-slate-800 w-full mb-8">สถานะการจอง</h3>
              <div className="relative flex items-center justify-center mb-8">
                <svg className="w-44 h-44 transform -rotate-90">
                  <circle cx="88" cy="88" r="75" stroke="#f1f5f9" strokeWidth="16" fill="transparent" />
                  <circle cx="88" cy="88" r="75" stroke="#3b82f6" strokeWidth="16" fill="transparent" 
                    strokeDasharray="471" strokeDashoffset={471 - (471 * confirmedRatio) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900">{confirmedRatio}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ยืนยันแล้ว</span>
                </div>
              </div>
              <div className="w-full space-y-3">
                <RatioRow label="โรงแรม & รีสอร์ท" percent={confirmedRatio} color="bg-blue-600" />
                <RatioRow label="ที่พักประเภทอื่นๆ" percent={100 - confirmedRatio} color="bg-slate-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
               <div className="relative z-10">
                  <TrendingUp className="mb-4 opacity-80" />
                  <h4 className="font-bold text-lg mb-2">เป้าหมายรายได้</h4>
                  <p className="text-blue-100 text-sm mb-6">คุณทำยอดทะลุเป้าหมายเดือนนี้ไปแล้ว 12% เยี่ยมยอด!</p>
                  <button className="w-full py-3 bg-white/10 backdrop-blur-md rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/20">ดูรายงานฉบับเต็ม</button>
               </div>
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-lg transition-all">
    <div className={`${bg} ${color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className={`text-2xl font-black text-slate-900`}>{value}</h3>
    </div>
  </div>
);

const ActionButton = ({ onClick, icon, label, color }) => (
  <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all active:scale-90 ${color}`}>
    {icon} {label}
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "Pending": "bg-amber-50 text-amber-600 border-amber-100",
    "Confirmed": "bg-blue-50 text-blue-600 border-blue-100",
    "Paid & Completed": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Cancelled": "bg-rose-50 text-rose-600 border-rose-100"
  };
  return (
    <div className="flex justify-center">
      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border tracking-wider ${styles[status] || styles.Pending}`}>
        {status === "Paid & Completed" ? "ชำระเงินแล้ว" : status}
      </span>
    </div>
  );
};

const RatioRow = ({ label, percent, color }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <div className="flex justify-between text-[11px] font-bold">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900">{percent}%</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default AdminDashboard;