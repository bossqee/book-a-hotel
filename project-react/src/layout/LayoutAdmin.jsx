import React from "react";
import { Outlet, Link, useNavigate } from "react-router"; // 1. นำ useNavigate มาใช้
import ShinyText from "../components/reactbits/ShinyText.jsx";
import Swal from "sweetalert2"; // 2. นำ SweetAlert2 มาใช้

const LayoutAdmin = () => {
  const navigate = useNavigate();

  // 3. ฟังก์ชันสำหรับ Logout
  const handleLogout = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "ยืนยันการออกจากระบบ?",
      text: "คุณต้องการออกจากเซสชันปัจจุบันหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007b40",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      // ตรวจสอบว่ากดยืนยัน (Confirm) หรือไม่
      if (result.isConfirmed) {
        // --- ส่วนที่แก้ไข 1: ลบข้อมูลเฉพาะที่เกี่ยวกับการ Login เท่านั้น ---
        // ไม่ใช้ localStorage.clear() เพราะจะทำให้ประวัติการจอง (myBookings) หาย
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userToken"); // หรือ key อื่นๆ ที่คุณใช้เก็บข้อมูล User

        Swal.fire({
          title: "ออกจากระบบสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // --- ส่วนที่แก้ไข 2: ย้าย navigate มาไว้ในนี้เพื่อให้ทำงานหลังจากปิดแจ้งเตือน ---
          navigate("/Login", { replace: true });
        });
      }
      // ถ้ากด Cancel (cancelButton) จะไม่เกิดอะไรขึ้น และหน้าเดิมจะไม่ถูกเปลี่ยน
    });
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10 backdrop-blur-md shadow-md">
        <div className="max-w-[1440px] mx-auto px-10 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center text-white text-lg font-semibold animate-in duration-500">
              <ShinyText
                text={<Link to={"/admin"}>MoonNight.com</Link>}
                animationDuration={1500}
                delayDuration={500}
                speed={3.1}
                color="#28282893"
                shineColor="#000000"
                spread={105}
                direction="left"
              />
            </div>

            <div className="flex items-center gap-6 text-white text-md animate-in duration-500">
              <Link
                className="text-black/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"/admin"}
              >
                Dashboard
              </Link>
              <Link
                className="text-black/90 hover:text-accent-gold text-sm font-medium transition-colors"
                to={"Category"}
              >
                Category
              </Link>

              {/* 4. เปลี่ยนเป็นปุ่ม หรือใส่ onClick ให้ Link */}
              <button
                onClick={handleLogout}
                className="bg-btn text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 5. อย่าลืมเว้นที่ให้เนื้อหาด้านบนเพราะ nav เป็น fixed */}
      <div className="pt-19">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
