import React, { useState } from 'react';

export default function Legend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-20 max-w-[280px] sm:max-w-xs transition-all duration-300 select-none">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden transition-colors">
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850"
        >
          <span>Keterangan Silsilah</span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {isOpen ? 'Tutup' : 'Buka'}
          </span>
        </button>

        {/* Content */}
        {isOpen && (
          <div className="p-3 space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
            {/* Kredit & Hak Cipta Pembuat Web */}
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <div className="text-[11px] leading-tight">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Pembuat Web & Hak Cipta:</span>
                <strong className="text-emerald-900 dark:text-emerald-200 font-extrabold text-xs block">
                  © 2026 Dicky Achmad Fahrezi
                </strong>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Hak Cipta Dilindungi</span>
              </div>
            </div>

            {/* Status & Peran */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1.5">
                Kategori Anggota
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600 border border-zinc-400 dark:border-zinc-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Almarhum / Almarhumah</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500 border border-amber-500 dark:border-amber-600 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Kakek Moyang (Khairi & Buang)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-600 border border-emerald-600 dark:border-emerald-700 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Keturunan Langsung</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400 dark:bg-rose-500 border border-rose-500 dark:border-rose-600 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Pasangan / Menantu</span>
                </div>
              </div>
            </div>

            {/* Garis Hubungan */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1.5">
                Garis Hubungan
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-1 bg-emerald-600 dark:bg-emerald-400 rounded" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Orang Tua ke Anak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-0.5 border-t-2 border-dashed border-amber-600 dark:border-amber-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Saudara Kandung</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-0.5 border-t-2 border-dashed border-pink-500 dark:border-pink-400" />
                  <span className="font-semibold text-pink-700 dark:text-pink-400">
                    Pernikahan Sepupu
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Pilih nama keluarga di bilah atas untuk fokus pada satu keluarga.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
