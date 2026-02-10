import React from "react";
import { LayoutDashboard, Hotel, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-10 mt-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-medium">
            Welcome, Admin Admin
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold">128</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-3xl font-bold">฿452,000</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
            <p className="text-gray-500 text-sm">Active Hotels</p>
            <p className="text-3xl font-bold">45</p>
          </div>
        </div>

        {/* Recent Activity Table (Mockup) */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-bold text-gray-800">Recent Bookings</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Hotel Name</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="p-4 font-medium">Banyan Tree Bangkok</td>
                <td className="p-4 text-gray-500">user@gmail.com</td>
                <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">Confirmed</span></td>
                <td className="p-4 font-bold">฿9,518</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;