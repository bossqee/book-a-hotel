import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Edit3, Save, X, Image as ImageIcon, 
  MapPin, Tag, Banknote, Star, Search, AlignLeft, BarChart3
} from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    tag: "",
    image: "",
    location: "",
    rating: 5.0,
    reviews: "",
    description: ""
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("admin_products") || "[]");
    const savedCats = JSON.parse(localStorage.getItem("categories") || "[]");
    setProducts(savedProducts);
    setCategories(savedCats);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tag) return Swal.fire("แจ้งเตือน", "กรุณาเลือกประเภทที่พัก", "warning");

    let updatedProducts;
    const finalData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice) || 0,
      rating: Number(formData.rating),
      reviews: formData.reviews ? Number(formData.reviews) : Math.floor(Math.random() * 5000) + 100,
    };

    if (editingId) {
      updatedProducts = products.map(p => p.id === editingId ? { ...finalData, id: editingId } : p);
      Swal.fire({ icon: 'success', title: 'อัปเดตเรียบร้อย', showConfirmButton: false, timer: 1500 });
    } else {
      const newProduct = { ...finalData, id: Date.now() };
      updatedProducts = [...products, newProduct];
      Swal.fire({ icon: 'success', title: 'เพิ่มที่พักใหม่สำเร็จ', showConfirmButton: false, timer: 1500 });
    }

    setProducts(updatedProducts);
    localStorage.setItem("admin_products", JSON.stringify(updatedProducts));
    resetForm();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "ข้อมูลนี้จะถูกลบออกจากระบบถาวร",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = products.filter(p => p.id !== id);
        setProducts(filtered);
        localStorage.setItem("admin_products", JSON.stringify(filtered));
      }
    });
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", oldPrice: "", tag: "", image: "", location: "", rating: 5.0, reviews: "", description: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const filteredList = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">ระบบจัดการหลังบ้าน</h1>
            <p className="text-slate-500 font-medium">เพิ่ม แก้ไข และดูแลข้อมูลที่พักทั้งหมด</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            <Plus size={24} /> เพิ่มที่พักใหม่
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="ค้นหาตามชื่อที่พัก..." 
            className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] border-none shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none font-semibold text-lg transition-all bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredList.map((item) => (
              <motion.div 
                layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                key={item.id} 
                className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:border-blue-200 transition-all"
              >
                <img src={item.image} className="w-40 h-32 object-cover rounded-2xl bg-slate-50 shadow-inner" alt="" />
                <div className="flex-1 space-y-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-1">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">{item.tag}</span>
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> {item.rating}
                    </span>
                  </div>
                  <h3 className="font-black text-xl text-slate-800">{item.name}</h3>
                  <p className="text-slate-400 text-sm font-medium flex items-center justify-center md:justify-start gap-1">
                    <MapPin size={14} className="text-blue-500" /> {item.location}
                  </p>
                </div>
                <div className="text-center md:text-right px-6 border-x border-slate-50">
                  <p className="text-blue-600 font-black text-2xl tracking-tighter">฿{Number(item.price).toLocaleString()}</p>
                  <p className="text-slate-300 text-sm line-through font-bold">฿{Number(item.oldPrice).toLocaleString()}</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">{item.reviews.toLocaleString()} รีวิว</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Edit3 size={20} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* --- POPUP MODAL (Enhanced) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={resetForm} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Preview Side */}
              <div className="hidden md:block w-5/12 bg-slate-50 relative border-r">
                {formData.image ? (
                  <img src={formData.image} className="w-full h-full object-cover opacity-90" alt="Preview" />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-10 text-slate-300">
                    <ImageIcon size={80} strokeWidth={1} />
                    <p className="text-sm font-bold uppercase mt-4 tracking-widest text-center">ตัวอย่างรูปภาพจะแสดงที่นี่</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-8">
                   <div className="text-white">
                      <p className="text-blue-400 text-xs font-black uppercase tracking-widest">{formData.tag || 'ประเภทที่พัก'}</p>
                      <h2 className="text-2xl font-black">{formData.name || 'ชื่อที่พักของคุณ'}</h2>
                      <p className="text-sm opacity-70 flex items-center gap-1 mt-1"><MapPin size={14}/> {formData.location || 'สถานที่ตั้ง'}</p>
                   </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="flex-1 flex flex-col">
                <div className="p-8 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{editingId ? 'แก้ไขข้อมูล' : 'เพิ่มที่พักใหม่'}</h2>
                    <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1">รายละเอียดข้อมูลแบบครบถ้วน</p>
                  </div>
                  <button onClick={resetForm} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar space-y-6">
                  {/* Section 1: Basic Info */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-blue-500 pl-2">ข้อมูลพื้นฐาน</label>
                    <input required type="text" placeholder="ชื่อที่พัก" className="modern-input" 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <select required className="modern-input" value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})}>
                        <option value="">เลือกประเภท...</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                      <input required type="text" placeholder="สถานที่ (เช่น กรุงเทพฯ)" className="modern-input"
                        value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                  </div>

                  {/* Section 2: Pricing & Stats */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-amber-500 pl-2">ราคาและสถิติ</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Banknote className="absolute left-4 top-4 text-slate-400" size={18} />
                        <input required type="number" placeholder="ราคาโปรโมชั่น" className="modern-input pl-12"
                          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                      </div>
                      <div className="relative">
                        <Banknote className="absolute left-4 top-4 text-slate-400" size={18} />
                        <input type="number" placeholder="ราคาเต็ม" className="modern-input pl-12 opacity-70"
                          value={formData.oldPrice} onChange={(e) => setFormData({...formData, oldPrice: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Star className="absolute left-4 top-4 text-amber-500" size={18} />
                        <input required type="number" step="0.1" max="10" placeholder="คะแนน (1-10)" className="modern-input pl-12"
                          value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} />
                      </div>
                      <div className="relative">
                        <BarChart3 className="absolute left-4 top-4 text-slate-400" size={18} />
                        <input type="number" placeholder="จำนวนรีวิว (เว้นว่างเพื่อสุ่ม)" className="modern-input pl-12"
                          value={formData.reviews} onChange={(e) => setFormData({...formData, reviews: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Media & Description */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-emerald-500 pl-2">รูปภาพและรายละเอียด</label>
                    <input required type="text" placeholder="URL รูปภาพ (เช่น https://...)" className="modern-input font-mono text-[11px]"
                      value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                    <textarea rows="3" placeholder="เขียนคำอธิบายที่น่าสนใจเกี่ยวกับที่พัก..." className="modern-input"
                      value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    <Save size={22}/> {editingId ? 'บันทึกการแก้ไข' : 'ยืนยันเพิ่มที่พักใหม่'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .modern-input {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #f1f5f9;
          border: 2px solid transparent;
          border-radius: 1.25rem;
          outline: none;
          font-weight: 600;
          transition: all 0.2s;
        }
        .modern-input:focus {
          background: white;
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminProduct;