export default function Search_Bar() {
  return (
    <form className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 rounded-xl bg-white p-2 shadow-lg">

        <div className="flex items-center gap-2 border rounded-lg px-4 py-3 flex-1">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            placeholder="ท่านจะไปที่ไหน?"
            className="w-full outline-none text-sm"
          />
        </div>

        <button className="flex items-center gap-2 rounded-lg px-4 py-3 flex-1 border-gray-300 border">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-sm text-gray-500">
            วันเช็คอิน — วันเช็คเอาท์
          </span>
        </button>

        <button className="flex items-center gap-2 border rounded-lg px-4 py-3 flex-1">
          <span className="material-symbols-outlined text-gray-500 text-xl mr-2">group</span>
          <span className="text-sm text-gray-500">
            ผู้ใหญ่ 2 · เด็ก 0 · 1 ห้อง
          </span>
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          ค้นหา
        </button>

      </div>
    </form>
  );
}