import React from 'react';
import { Crown, Sparkles, Heart } from 'lucide-react';

export default function BranchBar({ activeBranch, onSelectBranch }) {
  const mainGroups = [
    { id: 'all', label: '🌟 Semua', short: 'Semua' },
    { id: 'khairi_buang', label: '👑 Khairi & Buang', short: 'Leluhur' },
    { id: 'silang1', label: '💍 Silang 1: Hanifah & Madji', short: 'Silang 1' },
    { id: 'Muchsin-Maryanah', label: '💍 Silang 2: Muchsin & Maryanah', short: 'Silang 2' },
  ];

  const cabangA = [
    { id: 'Nasrullah', label: 'A2. Nasrullah' },
    { id: 'Nur Laila', label: 'A3. Nur Laila' },
    { id: 'Zainul Abidin', label: 'A4. Zainul Abidin' },
    { id: 'Farida', label: 'A5. Farida' },
    { id: 'Zaitun', label: 'A6. Zaitun' },
    { id: 'Mansyuri', label: 'A7. Mansyuri (Alm.)' },
    { id: 'Titin Sumarni', label: 'A8. Titin Sumarni' },
  ];

  const cabangB = [
    { id: 'Masiah', label: 'B1. Masiah (Almh.)' },
    { id: 'Maryamah', label: 'B2. Maryamah (Almh.)' },
    { id: 'Manisah', label: 'B4. Manisah (Almh.)' },
    { id: 'Maryati', label: 'B5. Maryati' },
    { id: 'Jamilah', label: 'B6. Jamilah (Almh.)' },
    { id: 'Marjenah', label: 'B7. Marjenah' },
    { id: 'Marhani', label: 'B8. Marhani' },
    { id: 'Ahmad Yani', label: 'B9. Ahmad Yani' },
    { id: 'Ahmad Nurjaya', label: 'B10. H. Ahmad Nurjaya (Alm.)' },
    { id: 'Marfuah', label: 'B11. Marfuah' },
    { id: 'Nurhasan', label: 'B12. Nurhasan (Alm.)' },
    { id: 'Fatimah', label: 'B13. Fatimah (Almh.)' },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 px-3 py-2 overflow-x-auto scrollbar-none select-none flex items-center gap-2 shrink-0 z-20 shadow-sm">
      {/* Tombol Utama & Silang */}
      <div className="flex items-center gap-1.5 shrink-0">
        {mainGroups.map((b) => {
          const isActive = activeBranch === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBranch(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all active:scale-95 whitespace-nowrap shadow-sm ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-emerald-700/30 ring-2 ring-emerald-500'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      <div className="h-5 w-px bg-slate-300 shrink-0 mx-1" />

      {/* Cabang A Badge */}
      <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-200 shrink-0">
        Cabang A (Abdul Ghani):
      </span>
      {cabangA.map((b) => {
        const isActive = activeBranch === b.id;
        return (
          <button
            key={b.id}
            onClick={() => onSelectBranch(b.id)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95 whitespace-nowrap shadow-sm ${
              isActive
                ? 'bg-indigo-600 text-white shadow-indigo-600/30 ring-2 ring-indigo-400'
                : 'bg-indigo-50/70 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            {b.label}
          </button>
        );
      })}

      <div className="h-5 w-px bg-slate-300 shrink-0 mx-1" />

      {/* Cabang B Badge */}
      <span className="text-[11px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 shrink-0">
        Cabang B (Madji & Hanifah):
      </span>
      {cabangB.map((b) => {
        const isActive = activeBranch === b.id;
        return (
          <button
            key={b.id}
            onClick={() => onSelectBranch(b.id)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95 whitespace-nowrap shadow-sm ${
              isActive
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            {b.label}
          </button>
        );
      })}
    </div>
  );
}
