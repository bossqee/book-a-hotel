import React from "react";
import { 
  Facebook, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Youtube 
} from 'lucide-react';
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
  </svg>
);
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0A1128] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MoonNight.com
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed text-left">
              เปิดประสบการณ์การพักผ่อนที่เหนือระดับ
              ค้นหาที่พักและแพ็กเกจที่ดีที่สุดสำหรับค่ำคืนอันแสนพิเศษของคุณ
            </p>
            <div className="flex items-center space-x-5 pt-2">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                <XIcon />
              </div>
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-4 text-white">Menu</h3>
            <ul className="space-y-2 text-sm  w-full text-left">
              <li>
                <a href="Accommodations" className="text-gray-400 hover:text-white cursor-pointer transition-colors text-dd">ที่พัก</a>
              </li>
              <li>
                <a href="Login" className="text-gray-400 hover:text-white cursor-pointer transition-colors text-dd">เข้าสู่ระบบ</a>
              </li>
              <li>
                <a href="Register" className="text-gray-400 hover:text-white cursor-pointer transition-colors text-dd">สมัครสมาชิก</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400 w-full text-left">
              <li className="hover:text-white cursor-pointer transition-colors">คำถามที่พบบ่อย</li>
              <li className="hover:text-white cursor-pointer transition-colors">นโยบายความเป็นส่วนตัว</li>
              <li className="hover:text-white cursor-pointer transition-colors">ข้อกำหนดและเงื่อนไข</li>
              <li className="hover:text-white cursor-pointer transition-colors">ติดต่อเรา</li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400 w-full text-left">
              <li className="flex items-start gap-3 justify-start">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>123 M1 Ban Bueng Chonburi Thailand</span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>MoonNight@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          <p>© 2026 MoonNight.com - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;