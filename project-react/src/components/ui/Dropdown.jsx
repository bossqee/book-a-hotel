import { useState } from "react";
import React from "react";
export default function TravelersDropdown({ onClose }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);

  const Row = ({ icon, title, subtitle, value, setValue, min = 0 }) => (
    <div className="flex items-center justify-between px-6 py-3 min-h-[80px] border-b border-slate-50 dark:border-slate-800/50">
      <div className="flex items-center gap-4">
        <div className="size-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-slate-900 dark:text-white font-semibold">
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setValue(v => Math.max(min, v - 1))}
          className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700
                     transition"
        >
          −
        </button>
        <span className="w-6 text-center font-bold text-slate-900 dark:text-white">
          {value}
        </span>
        <button
          onClick={() => setValue(v => v + 1)}
          className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700
                     transition"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="absolute top-[calc(100%+12px)] right-0 z-50 w-full max-w-[480px]
                 animate-in fade-in zoom-in duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Travelers
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Customize your luxury stay details
          </p>
        </div>

        {/* Rows */}
        <Row icon="person" title="Adults" subtitle="Ages 13 or above" value={adults} setValue={setAdults} min={1} />
        <Row icon="child_care" title="Children" subtitle="Ages 2–12" value={children} setValue={setChildren} />
        <Row icon="bed" title="Rooms" subtitle="Maximum luxury occupancy" value={rooms} setValue={setRooms} min={1} />

        {/* Actions */}
        <div className="p-6 pt-2">
          <button
            onClick={onClose}
            className="w-full h-14 rounded-full bg-slate-900 dark:bg-primary
                       text-white font-bold shadow-lg hover:opacity-90
                       active:scale-[0.98] transition"
          >
            Done
          </button>

          <button
            onClick={() => {
              setAdults(2);
              setChildren(0);
              setInfants(0);
              setRooms(1);
            }}
            className="w-full mt-2 text-sm font-semibold text-slate-500
                       hover:text-slate-900 dark:hover:text-white transition"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
