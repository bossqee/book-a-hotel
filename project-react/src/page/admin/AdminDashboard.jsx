import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Trash2,
  XCircle,
  Phone,
  User,
  Image as ImageIcon,
  BedDouble,
} from "lucide-react";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  useEffect(() => {
    // ฟังก์ชันโหลดข้อมูลใหม่
    const syncData = (e) => {
      if (e.key === "admin_products" || e.key === "myBookings") {
        loadData(); // ชื่อฟังก์ชันโหลดข้อมูลที่คุณมีในแต่ละหน้า
      }
    };

    // ดักฟังการเปลี่ยนแปลงของ LocalStorage จากหน้าอื่น
    window.addEventListener("storage", syncData);

    return () => window.removeEventListener("storage", syncData);
  }, []);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingBookings: 0,
    totalGuests: 0,
    totalRooms: 0,
  });

  // --- 1. Load & Calculate Data ---
  const loadData = () => {
    const rawData = localStorage.getItem("myBookings");
    const data = JSON.parse(rawData || "[]");
    const sortedData = [...data].reverse();
    setBookings(sortedData);

    // คำนวณ Stats
    const revenue = data.reduce(
      (sum, item) =>
        item.status === "Paid & Completed"
          ? sum + Number(item.totalPrice || 0)
          : sum,
      0,
    );
    const guests = data.reduce(
      (sum, item) =>
        sum + Number(item.adults || 0) + Number(item.children || 0),
      0,
    );
    const rooms = data.reduce(
      (sum, item) => sum + Number(item.roomCount || 0),
      0,
    );
    const pending = data.filter(
      (item) => item.status === "Pending" || !item.status,
    ).length;

    setStats({
      totalRevenue: revenue,
      pendingBookings: pending,
      totalGuests: guests,
      totalRooms: rooms,
    });
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = (e) => {
      if (e.key === "myBookings") loadData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // --- 2. Action Functions ---
  const updateStatus = (id, newStatus) => {
    const currentBookings = JSON.parse(
      localStorage.getItem("myBookings") || "[]",
    );

    // ค้นหาการจองที่ต้องการอัปเดต
    const updatedBookings = currentBookings.map((b) => {
      if (b.id === id) {
        // ดึงข้อมูลโรงแรมมาเตรียมไว้
        const currentHotels = JSON.parse(
          localStorage.getItem("admin_products") || "[]",
        );
        const hotelIndex = currentHotels.findIndex(
          (h) => h.name === b.hotelName,
        );

        if (hotelIndex !== -1) {
          // --- ส่วนจัดการ Stock ---

          // กรณี กดยืนยันชำระเงิน: ลดสต็อก (ต้องเช็คก่อนว่าเดิมไม่ใช่สำเร็จอยู่แล้ว)
          if (
            newStatus === "Paid & Completed" &&
            b.status !== "Paid & Completed"
          ) {
            if (currentHotels[hotelIndex].availableRooms >= b.roomCount) {
              currentHotels[hotelIndex].availableRooms -= b.roomCount;
            } else {
              Swal.fire("ผิดพลาด", "ห้องพักในสต็อกไม่พอ", "error");
              return b; // หยุด ไม่เปลี่ยนสถานะ
            }
          }

          // กรณี กดยกเลิก: ต้องคืนสต็อก (เฉพาะถ้าสถานะเดิมคือสำเร็จไปแล้ว)
          else if (
            newStatus === "Cancelled" &&
            b.status === "Paid & Completed"
          ) {
            currentHotels[hotelIndex].availableRooms += b.roomCount;
          }

          // เซฟจำนวนห้องที่อัปเดตกลับลง LocalStorage
          localStorage.setItem("admin_products", JSON.stringify(currentHotels));
        }

        // ส่งคืน Object ที่อัปเดตสถานะใหม่
        return { ...b, status: newStatus };
      }
      return b;
    });

    localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
    loadData();
    Swal.fire({
      icon: "success",
      title: "ดำเนินการสำเร็จ",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const deleteBooking = (id) => {
    Swal.fire({
      title: "ลบรายการจอง?",
      text: "หากรายการนี้ยืนยันแล้ว ระบบจะคืนห้องเข้าสต็อกให้โดยอัตโนมัติ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "ยืนยันการลบ",
    }).then((result) => {
      if (result.isConfirmed) {
        const currentBookings = JSON.parse(
          localStorage.getItem("myBookings") || "[]",
        );
        const bookingToDelete = currentBookings.find((b) => b.id === id);

        // --- เพิ่ม Logic คืนห้องถ้าลบรายการที่สำเร็จไปแล้ว ---
        if (bookingToDelete && bookingToDelete.status === "Paid & Completed") {
          const currentHotels = JSON.parse(
            localStorage.getItem("admin_products") || "[]",
          );
          const hotelIndex = currentHotels.findIndex(
            (h) => h.name === bookingToDelete.hotelName,
          );

          if (hotelIndex !== -1) {
            currentHotels[hotelIndex].availableRooms += Number(
              bookingToDelete.roomCount,
            );
            localStorage.setItem(
              "admin_products",
              JSON.stringify(currentHotels),
            );
          }
        }
        // -------------------------------------------

        const updated = currentBookings.filter((b) => b.id !== id);
        localStorage.setItem("myBookings", JSON.stringify(updated));
        loadData();
      }
    });
  };

  const viewSlip = (slipUrl) => {
    Swal.fire({
      title: "หลักฐานการโอนเงิน",
      imageUrl: slipUrl,
      imageAlt: "Slip Payment",
      confirmButtonText: "ปิดหน้าต่าง",
      confirmButtonColor: "#3b82f6",
      customClass: { popup: "!rounded-[2rem]" },
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans antialiased text-slate-900">
      <main className="pt-10 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg">
              <LayoutDashboard size={24} />
            </div>
            Booking <span className="text-blue-600">Dashboard</span>
          </h1>
        </header>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<DollarSign />}
            label="ยอดรวมที่สำเร็จ"
            value={`฿${stats.totalRevenue.toLocaleString()}`}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            icon={<Clock />}
            label="รอตรวจสอบ"
            value={`${stats.pendingBookings}`}
            color="text-amber-600"
            bg="bg-amber-50"
          />
          <StatCard
            icon={<Users />}
            label="ผู้เข้าพักรวม"
            value={`${stats.totalGuests} ท่าน`}
            color="text-indigo-600"
            bg="bg-indigo-50"
          />
          <StatCard
            icon={<BedDouble />}
            label="จำนวนห้องรวม"
            value={`${stats.totalRooms} ห้อง`}
            color="text-blue-600"
            bg="bg-blue-50"
          />
        </div>

        {/* BOOKING TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="font-bold text-xl text-slate-800">
              รายการจองและชำระเงิน
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.1em] border-b border-slate-50">
                  <th className="px-8 py-5">ข้อมูลที่พัก / ลูกค้า</th>
                  <th className="px-8 py-5">การชำระเงิน</th>
                  <th className="px-8 py-5">รายละเอียด</th>
                  <th className="px-8 py-5 text-right">ยอดชำระ</th>
                  <th className="px-8 py-5 text-center">สถานะ</th>
                  <th className="px-8 py-5 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.hotelImage}
                          className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                          alt=""
                        />
                        <div>
                          <span className="font-bold text-slate-800 block text-sm">
                            {item.hotelName}
                          </span>
                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                              <User size={12} /> {item.guestName}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                              <Phone size={11} /> {item.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${item.paymentMethod === "Pay Now" ? "bg-purple-50 text-purple-600" : "bg-orange-50 text-orange-600"}`}
                        >
                          {item.paymentMethod}
                        </span>
                        {item.paymentMethod === "Pay Now" && item.slipImage && (
                          <button
                            onClick={() => viewSlip(item.slipImage)}
                            className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:underline mt-1"
                          >
                            <ImageIcon size={12} /> ดูสลิปโอนเงิน
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-medium text-slate-500">
                      <p>
                        📅 {item.checkin} - {item.checkout}
                      </p>
                      <p>
                        🏨 {item.roomCount} ห้อง /{" "}
                        {Number(item.adults) + Number(item.children)} คน
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-slate-900">
                      ฿{item.totalPrice?.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <StatusBadge status={item.status || "Pending"} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {(!item.status || item.status === "Pending") && (
                          <>
                            <ActionButton
                              onClick={() =>
                                updateStatus(item.id, "Paid & Completed")
                              }
                              icon={<CheckCircle size={14} />}
                              label="ยืนยัน"
                              color="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                            />
                            <ActionButton
                              onClick={() => updateStatus(item.id, "Cancelled")}
                              icon={<XCircle size={14} />}
                              label="ปฏิเสธ"
                              color="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                            />
                          </>
                        )}
                        <button
                          onClick={() => deleteBooking(item.id)}
                          className="p-2 text-slate-300 hover:text-rose-600 transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="py-20 text-center text-slate-400 font-bold italic">
                ไม่มีข้อมูลการจองในขณะนี้
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUB COMPONENTS ---
const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
    <div className={`${bg} ${color} p-4 rounded-2xl shadow-inner`}>{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h3 className="text-xl font-black text-slate-900">{value}</h3>
    </div>
  </div>
);

const ActionButton = ({ onClick, icon, label, color }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-[10px] transition-all active:scale-95 border border-transparent shadow-sm ${color}`}
  >
    {icon} {label}
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    "Paid & Completed": "bg-emerald-50 text-emerald-600 border-emerald-100",
    Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };
  const labels = {
    Pending: "รออนุมัติ",
    "Paid & Completed": "จองสำเร็จ",
    Cancelled: "ยกเลิกแล้ว",
  };
  return (
    <span
      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase border tracking-widest ${styles[status] || styles.Pending}`}
    >
      {labels[status] || labels.Pending}
    </span>
  );
};

export default AdminDashboard;
