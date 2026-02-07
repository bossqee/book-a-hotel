import React from "react";

const Search_Bar = () => {
  return (
    <div class="w-full max-w-4xl bg-white/95 dark:bg-background-dark/95 backdrop-blur-md p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-stretch gap-2 border border-white/20">
      <div class="flex-1 flex items-center px-4 py-3 border-r border-gray-100 dark:border-gray-800">
        <span class="material-symbols-outlined text-accent-gold mr-3">
          location_on
        </span>
        <input
          class="bg-transparent border-none focus:ring-0 text-deep-navy dark:text-white placeholder:text-gray-400 w-full font-medium"
          placeholder="Where to?"
          type="text"
        />
      </div>
      <div class="flex-1 flex items-center px-4 py-3 border-r border-gray-100 dark:border-gray-800">
        <span class="material-symbols-outlined text-accent-gold mr-3">
          calendar_today
        </span>
        <input
          class="bg-transparent border-none focus:ring-0 text-deep-navy dark:text-white placeholder:text-gray-400 w-full font-medium"
          placeholder="Check-in / Out"
          type="text"
        />
      </div>
      <div class="flex-1 flex items-center px-4 py-3">
        <span class="material-symbols-outlined text-accent-gold mr-3">
          person
        </span>
        <input
          class="bg-transparent border-none focus:ring-0 text-deep-navy dark:text-white placeholder:text-gray-400 w-full font-medium"
          placeholder="2 Guests"
          type="text"
        />
      </div>
      <button class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
        <span class="material-symbols-outlined">search</span>
        <span>Search</span>
      </button>
    </div>
  );
};

export default Search_Bar;
