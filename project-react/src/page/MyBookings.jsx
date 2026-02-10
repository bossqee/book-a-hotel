import react, { useState, useEffect } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myBookings") || "[]");
    setBookings(data);
  }, []);

  return (
    <div className="pt-28 pb-16 px-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-navy-deep mb-8">
        ประวัติการจองของฉัน
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500">คุณยังไม่มีรายการจองในขณะนี้</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col md:flex-row border rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <img
                src={booking.hotelImage}
                className="w-full md:w-48 h-32 object-cover"
                alt=""
              />
              <div className="p-4 flex-grow flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{booking.hotelName}</h3>
                  <p className="text-sm text-gray-500">
                    🗓 {booking.checkin} - {booking.checkout}
                  </p>
                  <p className="text-sm text-gray-600">
                    👤 ผู้ใหญ่: {booking.adults} เด็ก: {booking.children}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.status === "Pending" ? "รอชำระเงิน" : "สำเร็จ"}
                  </span>
                  <p className="mt-2 font-bold text-blue-600">
                    {/* เช็คก่อนว่ามีราคาไหม และเป็นตัวเลขไหม */}
                    THB{" "}
                    {booking.totalPrice
                      ? Number(booking.totalPrice).toLocaleString()
                      : "0"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
