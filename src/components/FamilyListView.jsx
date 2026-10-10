import React, { useState } from 'react';
import { Crown, Heart, ChevronDown, ChevronRight, Users, Sparkles } from 'lucide-react';
import { familyData, getChildren, getSpouses } from '../data';

export default function FamilyListView({ onSelectPerson, searchQuery = '' }) {
  const [activeTab, setActiveTab] = useState('cabang_b'); // 'cabang_a' atau 'cabang_b'

  // Cabang A (8 Anak H. Abdul Ghani & HJ. Asyuro)
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

  // Cabang B (14 Anak H. Madji & HJ. Hanifah)
  const cabangBList = [
    { id: 'masiah', name: 'B1. Masiah', deceased: 'Almarhumah' },
    { id: 'maryamah', name: 'B2. Maryamah', spouseName: 'Abdul Rouf', deceased: 'Keduanya Almarhum' },
    { id: 'maryanah', name: 'B3. Maryanah', spouseName: 'Muchsin', deceased: 'Suami Almarhum', note: '💍 Pernikahan Silang 2 dengan Cabang A no. 1' },
    { id: 'manisah', name: 'B4. HJ. Manisah', spouseName: 'H. Supardi Ahmad', deceased: 'Keduanya Almarhum' },
    { id: 'maryati', name: 'B5. Maryati', spouseName: 'Marjuni', deceased: 'Suami Almarhum' },
    { id: 'jamilah', name: 'B6. HJ. Jamilah', spouseName: 'H. M. Sodri', deceased: 'Keduanya Almarhum' },
    { id: 'marjenah', name: 'B7. Marjenah', spouseName: 'Agani', deceased: 'Suami Almarhum' },
    { id: 'marhani', name: 'B8. Marhani', spouseName: 'Saman' },
    { id: 'ahmad_yani', name: 'B9. Ahmad Yani', spouseName: 'Nur Janah' },
    { id: 'ahmad_nurjaya', name: 'B10. H. Ahmad Nurjaya', spouseName: 'Siti Aisyah', deceased: 'Suami Almarhum' },
    { id: 'ahmad_kurniawan', name: 'B11. Ahmad Kurniawan', spouseName: 'Eha' },
    { id: 'marfuah', name: 'B12. Marfuah', spouseName: 'Joko' },
    { id: 'nurhasan', name: 'B13. Nurhasan', deceased: 'Almarhum' },
    { id: 'fatimah', name: 'B14. Fatimah', deceased: 'Almarhumah' },
  ];

  const [openBranches, setOpenBranches] = useState({ maryanah: true, muchsin: true, maryamah: true });

  const toggleBranch = (branchId) => {
    setOpenBranches((prev) => ({
      ...prev,
      [branchId]: !prev[branchId],
    }));
  };

  // Helper jika ada pencarian, cek apakah cabang mengandung nama yang dicari (mendukung haji -> h. & haja -> hj.)
  const query = searchQuery.trim().toLowerCase();
  const normalizedQuery = query.replace(/\bhaji\b/g, 'h.').replace(/\bhaja\b/g, 'hj.').trim();
  const matchStr = (str) => {
    if (!str) return false;
    const s = str.toLowerCase();
    return s.includes(query) || (normalizedQuery && s.includes(normalizedQuery));
  };
  const branchMatchesSearch = (item) => {
    if (!query) return true;
    if (matchStr(item.name)) return true;
    if (item.spouseName && matchStr(item.spouseName)) return true;
    const person = familyData.find((p) => p.id === item.id);
    if (!person) return false;
    const children = getChildren(person.id);
    for (const ch of children) {
      if (matchStr(ch.name) || matchStr(ch.rawName)) return true;
      const grandChildren = getChildren(ch.id);
      for (const gc of grandChildren) {
        if (matchStr(gc.name) || matchStr(gc.rawName)) return true;
      }
    }
    return false;
  };

  const activeList = activeTab === 'cabang_a' ? cabangAList : cabangBList;

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-6 pb-24 text-slate-900 dark:text-slate-100 max-w-4xl mx-auto space-y-6 select-none transition-colors">
      {/* Kartu Penjelasan Silsilah & 2 Pernikahan Menyilang */}
      <div className="p-4 sm:p-6 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 shadow-md">
        <h2 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-200 flex items-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          Akar Silsilah & Dua Pernikahan Menyilang
        </h2>
        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2.5 leading-relaxed">
          <p>
            • <strong className="text-amber-900 dark:text-amber-300">Generasi 1 (Kakek Moyang):</strong> Kakek <strong className="text-amber-950 dark:text-amber-100 underline decoration-amber-400">Khairi</strong> dan Kakek <strong className="text-amber-950 dark:text-amber-100 underline decoration-amber-400">Buang</strong> adalah <em>kakak-beradik kandung</em>.
          </p>
          <div className="p-2.5 rounded-xl bg-pink-100/70 dark:bg-pink-950/40 border border-pink-300 dark:border-pink-800 space-y-1 text-pink-950 dark:text-pink-200 font-medium">
            <p className="font-bold text-pink-900 dark:text-pink-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              Pernikahan Menyilang 1:
            </p>
            <p>
              Putri Kakek Khairi (<strong>HJ. Hanifah</strong>) menikah dengan putra Kakek Buang (<strong>H. Madji</strong>) → Lahir 14 anak di <em>Cabang B</em>.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-100/70 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-800 space-y-1 text-indigo-950 dark:text-indigo-200 font-medium">
            <p className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Pernikahan Menyilang 2:
            </p>
            <p>
              Putra H. Abdul Ghani di Cabang A (<strong>Muchsin</strong>) menikah dengan putri H. Madji & HJ. Hanifah di Cabang B (<strong>Maryanah</strong>).
            </p>
          </div>
        </div>
      </div>

      {/* Tab Switcher: Cabang A vs Cabang B */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('cabang_b')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm ${
            activeTab === 'cabang_b'
              ? 'bg-emerald-700 text-white shadow-emerald-700/20'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🌿 Cabang B (H. Madji & HJ. Hanifah - 14 Anak)
        </button>
        <button
          onClick={() => setActiveTab('cabang_a')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm ${
            activeTab === 'cabang_a'
              ? 'bg-indigo-700 text-white shadow-indigo-700/20'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔷 Cabang A (H. Abdul Ghani & HJ. Asyuro - 8 Anak)
        </button>
      </div>

      {/* Daftar Anggota Keluarga */}
      <div className="space-y-3">
        {activeList.map((item) => {
          const isMatch = branchMatchesSearch(item);
          const isOpen = Boolean(openBranches[item.id]) || Boolean(query && isMatch);
          const person = familyData.find((p) => p.id === item.id);
          const children = person ? getChildren(person.id) : [];

          // Sembunyikan item yang sama sekali tidak cocok jika sedang mencari
          if (query && !isMatch) return null;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border-2 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all ${
                query && isMatch
                  ? 'border-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-700 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600'
              }`}
            >
              {/* Header Kartu Anak */}
              <button
                onClick={() => toggleBranch(item.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                    person?.isDeceased
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                      : activeTab === 'cabang_a'
                      ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                  }`}>
                    {item.name.replace(/^[A-B][0-9]+\.\s*/, '').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                        {item.name}
                      </span>
                      {item.deceased && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                          🕊️ {item.deceased}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                      {item.spouseName ? (
                        <span>Menikah dengan: <strong className="text-slate-800 dark:text-slate-200">{item.spouseName}</strong></span>
                      ) : (
                        <span>Tidak tercatat pasangan</span>
                      )}
                      {children.length > 0 && (
                        <span className="text-emerald-700 dark:text-emerald-400 ml-2 font-bold">• {children.length} Anak</span>
                      )}
                    </div>
                    {item.note && (
                      <div className="text-[11px] font-bold text-pink-700 dark:text-pink-400 mt-1">
                        {item.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                  {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </button>

              {/* Isi Keturunan saat kartu dibuka */}
              {isOpen && (
                <div className="p-4 pt-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 space-y-3">
                  {children.length > 0 ? (
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase text-slate-600 dark:text-slate-400 tracking-wider">
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
                              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 cursor-pointer shadow-sm hover:shadow transition-all"
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                                  <span>{idx + 1}. {child.name}</span>
                                  {child.isDeceased && (
                                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold">🕊️ (Alm.)</span>
                                  )}
                                </div>
                              </div>

                              {childSpouses.length > 0 && (
                                <div className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold mt-1 flex items-center gap-1">
                                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />
                                  <span>Pasangan: {childSpouses.map(s => s.name).join(', ')}</span>
                                </div>
                              )}

                              {grandChildren.length > 0 && (
                                <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                                  <span className="text-slate-500 dark:text-slate-400 block mb-1 font-bold">Anak:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {grandChildren.map((gc) => (
                                      <span
                                        key={gc.id}
                                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-semibold border border-slate-200 dark:border-slate-700"
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
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic py-2">
                      Belum ada data keturunan tercatat untuk anggota ini.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Copyright Dicky Achmad Fahrezi */}
      <footer className="pt-8 pb-4 text-center border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p className="font-extrabold text-slate-700 dark:text-slate-300">
          © 2026 Dicky Achmad Fahrezi (Pembuat Web) • Hak Cipta Dilindungi
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-500">
          Silsilah Keluarga Besar Khairi & Buang • Dibuat dengan cinta untuk seluruh keluarga
        </p>
      </footer>
    </div>
  );
}
