import React, { useState, useEffect } from "react";
import { LayoutGrid, Plus, Trash2, Edit3, Save, X, Tag } from "lucide-react";
import Swal from "sweetalert2";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // เก็บ ID ที่กำลังแก้
  const [newCat, setNewCat] = useState({ name: "", description: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categories") || "[]");
    // ถ้ายังไม่มีข้อมูล ให้ Mock ไว้เบื้องต้น
    if (data.length === 0) {
      const initial = [
        { id: 1, name: "โรงแรม", description: "ที่พักมาตรฐานพร้อมบริการครบครัน" },
        { id: 2, name: "วิลล่า", description: "บ้านพักส่วนตัวบรรยากาศดี" }
      ];
      localStorage.setItem("categories", JSON.stringify(initial));
      setCategories(initial);
    } else {
      setCategories(data);
    }
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("categories", JSON.stringify(updated));
    setCategories(updated);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCat.name) return;
    const updated = [...categories, { ...newCat, id: Date.now() }];
    saveToStorage(updated);
    setNewCat({ name: "", description: "" });
    Swal.fire({ icon: 'success', title: 'เพิ่มหมวดหมู่แล้ว', timer: 1000, showConfirmButton: false });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'ลบหมวดหมู่?', text: "ที่พักในหมวดนี้อาจได้รับผลกระทบ", icon: 'warning',
      showCancelButton: true, confirmButtonText: 'ลบเลย'
    }).then(res => {
      if (res.isConfirmed) {
        saveToStorage(categories.filter(c => c.id !== id));
      }
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
            <LayoutGrid size={24} />
          </div>
          Category <span className="text-indigo-600">Management</span>
        </h1>
        <p className="text-slate-500 mt-2">จัดการประเภทที่พักที่คุณต้องการเปิดให้บริการ</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: ADD FORM --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 h-fit">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Plus size={20} className="text-indigo-600" /> เพิ่มหมวดหมู่ใหม่
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">ชื่อหมวดหมู่</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="เช่น รีสอร์ท, แคมป์ปิ้ง"
                value={newCat.name}
                onChange={e => setNewCat({...newCat, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">คำอธิบาย</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24"
                placeholder="อธิบายสั้นๆ เกี่ยวกับประเภทนี้"
                value={newCat.description}
                onChange={e => setNewCat({...newCat, description: e.target.value})}
              />
            </div>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
              <Save size={18} /> บันทึกข้อมูล
            </button>
          </form>
        </div>

        {/* --- RIGHT: CATEGORY LIST --- */}
        <div className="lg:col-span-2 space-y-4">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-5">
                <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                  <Tag size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{cat.name}</h4>
                  <p className="text-sm text-slate-400 font-medium">{cat.description}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          {categories.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">ยังไม่มีข้อมูลหมวดหมู่</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminCategory;