import React from "react";
import { Link } from "react-router";

const Nav_Home = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-10 py-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center text-white text-lg font-semibold animate-in slide-in-from-top duration-500">
            <Link style={{color: 'white', textDecoration: 'none'}} to={"/"}>Home</Link>
          </div>
          <div className="flex items-center gap-6 text-white text-md animate-in slide-in-from-top duration-500">
            <Link style={{color: 'white', textDecoration: 'none'}} className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors" to={"Accommodations"}>Accommodations </Link>
            <Link style={{color: 'white', textDecoration: 'none'}} className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors" to={"Packages"}>Packages </Link>
            <Link style={{color: 'white', textDecoration: 'none'}} className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors" to={"Offers"}>Offers </Link>
            <Link style={{color: 'white', textDecoration: 'none'}} className="text-white/90 hover:text-accent-gold text-sm font-medium transition-colors" to={"Login"}>Login </Link>
            <Link style={{color: 'black', textDecoration: 'none'}} className="bg-btn hover:bg-accent-gold/90 text-deep-navy px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg" to={"Register"}>Register </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav_Home;
