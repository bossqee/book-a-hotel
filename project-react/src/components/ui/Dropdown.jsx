import React from "react";

function Dropdown({ open }) {
  return (
    <div
      className={`
        absolute top-[calc(100%+12px)] right-0 w-80
        bg-white dark:bg-background-dark
        rounded-2xl shadow-2xl
        border border-gray-100 dark:border-gray-800
        p-6 z-50 text-left
        transform transition-all duration-200 ease-out origin-top
        ${open
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-6">

        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-deep-navy dark:text-white text-sm">
              Adults
            </p>
            <p className="text-xs text-gray-500">Ages 13 or above</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-deep-navy hover:text-deep-navy transition">
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
            <span className="font-semibold text-sm w-4 text-center">2</span>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-deep-navy hover:text-deep-navy transition">
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-deep-navy dark:text-white text-sm">
              Children
            </p>
            <p className="text-xs text-gray-500">Ages 2–12</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-deep-navy hover:text-deep-navy transition">
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
            <span className="font-semibold text-sm w-4 text-center">0</span>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-deep-navy hover:text-deep-navy transition">
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-deep-navy dark:text-white text-sm">
              Rooms
            </p>
            <p className="text-xs text-gray-500">Private accommodation</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-deep-navy hover:text-deep-navy transition">
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
            <span className="font-semibold text-sm w-4 text-center">1</span>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-deep-navy hover:text-deep-navy transition">
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-deep-navy dark:bg-white dark:text-deep-navy text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition">
          Done
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
