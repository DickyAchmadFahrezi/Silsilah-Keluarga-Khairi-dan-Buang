import React, { useState } from 'react';
import { Crown, Heart, ChevronDown, ChevronRight, Users, Sparkles } from 'lucide-react';
import { familyData, getChildren, getSpouses } from '../data';

export default function FamilyListView({ onSelectPerson }) {
  const [activeTab, setActiveTab] = useState('cabang_b'); // 'cabang_a' atau 'cabang_b'

  // Cabang A (8 Anak Haji Abdul Ghani & Haja Asyuro)
  const cabangAList = [
    { id: 'muchsin', name: 'A1. Muchsin (Alm.)', spouseName: 'Maryanah', deceased: 'Almarhum', note: '💍 Pernikahan Silang 2 dengan Cabang B no. 3' },
    { id: 'nasrullah', name: 'A2. Nasrullah', spouseName: 'Mujenah' },
    { id: 'nur_laila', name: 'A3. Nur Laila', spouseName: 'Nur Bahri' },
    { id: 'zainul_abidin', name: 'A4. Zainul Abidin', spouseName: 'Suryati' },
    { id: 'farida', name: 'A5. Farida', spouseName: 'Sulaeman Tanjung', deceased: 'Suami Almarhum' },
    { id: 'zaitun', name: 'A6. Zaitun', spouseName: 'Chairudin' },
    { id: 'mansyuri', name: 'A7. Mansyuri', spouseName: 'Neni khaironi', deceased: 'Almarhum' },
    { id: 'titin_sumarni', name: 'A8. Titin Sumarni', spouseName: 'A. Badawi' },
  ];

  // Cabang B (14 Anak Haji Madji & Haja Hanifah)
  const cabangBList = [
    { id: 'masiah', name: 'B1. Masiah', deceased: 'Almarhumah' },
    { id: 'maryamah', name: 'B2. Maryamah', spouseName: 'Abdul Rouf', deceased: 'Keduanya Almarhum' },
    { id: 'maryanah', name: 'B3. Maryanah', spouseName: 'Muchsin', deceased: 'Suami Almarhum', note: '💍 Pernikahan Silang 2 dengan Cabang A no. 1' },
    { id: 'manisah', name: 'B4. Haja Manisah', spouseName: 'Haji Supardi Ahmad', deceased: 'Keduanya Almarhum' },
    { id: 'maryati', name: 'B5. Maryati', spouseName: 'Marjuni', deceased: 'Suami Almarhum' },
    { id: 'jamilah', name: 'B6. Haja Jamilah', spouseName: 'Haji M. Sodri', deceased: 'Keduanya Almarhum' },
    { id: 'marjenah', name: 'B7. Marjenah', spouseName: 'Agani', deceased: 'Suami Almarhum' },
    { id: 'marhani', name: 'B8. Marhani', spouseName: 'Saman' },
    { id: 'ahmad_yani', name: 'B9. Ahmad Yani', spouseName: 'Nur Janah' },
    { id: 'ahmad_nurjaya', name: 'B10. Haji Ahmad Nurjaya', spouseName: 'Siti Aisyah', deceased: 'Suami Almarhum' },
    { id: 'marfuah', name: 'B11. Marfuah', spouseName: 'Joko' },
    { id: 'nurhasan', name: 'B12. Nurhasan', deceased: 'Almarhum' },
    { id: 'fatimah', name: 'B13. Fatimah', deceased: 'Almarhumah' },
  ];

  const [openBranches, setOpenBranches] = useState({ maryanah: true, muchsin: true, maryamah: true });

  const toggleBranch = (branchId) => {
    setOpenBranches((prev) => ({
      ...prev,
      [branchId]: !prev[branchId],
    }));
  };

  const activeList = activeTab === 'cabang_a' ? cabangAList : cabangBList;

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 px-3 sm:px-6 py-6 pb-24 text-slate-900 max-w-4xl mx-auto space-y-6 select-none">
      {/* Kartu Penjelasan Silsilah & 2 Pernikahan Menyilang */}
      <div className="p-4 sm:p-6 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-md">
        <h2 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-amber-600 shrink-0" />
          Akar Silsilah & Dua Pernikahan Menyilang
        </h2>
        <div className="text-xs sm:text-sm text-slate-800 space-y-2.5 leading-relaxed">
          <p>
            • <strong className="text-amber-900">Generasi 1 (Kakek Moyang):</strong> Kakek <strong className="text-amber-950 underline decoration-amber-400">Khairi</strong> dan Kakek <strong className="text-amber-950 underline decoration-amber-400">Buang</strong> adalah <em>kakak-beradik kandung</em>.
          </p>
          <div className="p-2.5 rounded-xl bg-pink-100/70 border border-pink-300 space-y-1 text-pink-950 font-medium">
            <p className="font-bold text-pink-900 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-pink-600" />
              Pernikahan Menyilang 1:
            </p>
            <p>
              Putri Kakek Khairi (<strong>Haja Hanifah</strong>) menikah dengan putra Kakek Buang (<strong>Haji Madji</strong>) → Lahir 14 anak di <em>Cabang B</em>.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-100/70 border border-indigo-300 space-y-1 text-indigo-950 font-medium">
            <p className="font-bold text-indigo-900 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Pernikahan Menyilang 2:
            </p>
            <p>
              Putra Haji Abdul Ghani di Cabang A (<strong>Muchsin</strong>) menikah dengan putri Haji Madji & Haja Hanifah di Cabang B (<strong>Maryanah</strong>).
            </p>
          </div>
        </div>
      </div>

      {/* Tab Switcher: Cabang A vs Cabang B */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300">
        <button
          onClick={() => setActiveTab('cabang_b')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm ${
            activeTab === 'cabang_b'
              ? 'bg-emerald-700 text-white shadow-emerald-700/20'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🌿 Cabang B (Haji Madji & Haja Hanifah - 14 Anak)
        </button>
        <button
          onClick={() => setActiveTab('cabang_a')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm ${
            activeTab === 'cabang_a'
              ? 'bg-indigo-700 text-white shadow-indigo-700/20'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🔷 Cabang A (Haji Abdul Ghani & Haja Asyuro - 8 Anak)
        </button>
      </div>

      {/* Daftar Anggota Keluarga */}
      <div className="space-y-3">
        {activeList.map((item) => {
          const isOpen = Boolean(openBranches[item.id]);
          const person = familyData.find((p) => p.id === item.id);
          const children = person ? getChildren(person.id) : [];

          return (
            <div
              key={item.id}
              className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm hover:border-emerald-300 transition-all"
            >
              {/* Header Kartu Anak */}
              <button
                onClick={() => toggleBranch(item.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                    person?.isDeceased
                      ? 'bg-zinc-100 text-zinc-700 border-zinc-300'
                      : activeTab === 'cabang_a'
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                      : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    {item.name.replace(/^[A-B][0-9]+\.\s*/, '').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">
                        {item.name}
                      </span>
                      {item.deceased && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-zinc-100 text-zinc-800 border border-zinc-300">
                          🕊️ {item.deceased}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 font-medium">
                      {item.spouseName ? (
                        <span>Menikah dengan: <strong className="text-slate-800">{item.spouseName}</strong></span>
                      ) : (
                        <span>Tidak tercatat pasangan</span>
                      )}
                      {children.length > 0 && (
                        <span className="text-emerald-700 ml-2 font-bold">• {children.length} Anak</span>
                      )}
                    </div>
                    {item.note && (
                      <div className="text-[11px] font-bold text-pink-700 mt-1">
                        {item.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                  {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </button>

              {/* Isi Keturunan saat kartu dibuka */}
              {isOpen && (
                <div className="p-4 pt-2 border-t border-slate-200 bg-slate-50/70 space-y-3">
                  {children.length > 0 ? (
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase text-slate-600 tracking-wider">
                        Keturunan (Anak):
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {children.map((child, idx) => {
                          const childSpouses = getSpouses(child.id);
                          const grandChildren = getChildren(child.id);

                          return (
                            <div
                              key={child.id}
                              onClick={() => onSelectPerson && onSelectPerson(child)}
                              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 cursor-pointer shadow-sm hover:shadow transition-all"
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                                  <span>{idx + 1}. {child.name}</span>
                                  {child.isDeceased && (
                                    <span className="text-[10px] text-zinc-600 font-bold">🕊️ (Alm.)</span>
                                  )}
                                </div>
                              </div>

                              {childSpouses.length > 0 && (
                                <div className="text-[11px] text-rose-700 font-semibold mt-1 flex items-center gap-1">
                                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />
                                  <span>Pasangan: {childSpouses.map(s => s.name).join(', ')}</span>
                                </div>
                              )}

                              {grandChildren.length > 0 && (
                                <div className="mt-2 pt-1.5 border-t border-slate-100 text-[11px]">
                                  <span className="text-slate-500 block mb-1 font-bold">Anak:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {grandChildren.map((gc) => (
                                      <span
                                        key={gc.id}
                                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold border border-slate-200"
                                      >
                                        {gc.name} {gc.isDeceased ? '(Alm.)' : ''}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic py-2">
                      Belum ada data keturunan tercatat untuk anggota ini.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
