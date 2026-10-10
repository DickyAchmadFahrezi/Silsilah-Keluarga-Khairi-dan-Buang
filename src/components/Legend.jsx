import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Crown, Heart, ShieldCheck, Sparkles, HelpCircle, Code } from 'lucide-react';

export default function Legend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-20 max-w-[280px] sm:max-w-xs transition-all duration-300 select-none">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden transition-colors">
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850"
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Keterangan & Pembuat Web</span>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Content */}
        {isOpen && (
          <div className="p-3 space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
            {/* Kredit & Hak Cipta Pembuat Web */}
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
              <div className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-wider mb-1.5">
                Kategori Anggota
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs">
                    🕊️
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Almarhum / Almarhumah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-800 dark:text-amber-300 font-bold">
                    <Crown className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Kakek Moyang (Khairi & Buang)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Keturunan Langsung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-700 flex items-center justify-center text-rose-800 dark:text-rose-300">
                    <Heart className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Pasangan / Menantu</span>
                </div>
              </div>
            </div>

            {/* Garis Hubungan */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-wider mb-1.5">
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
                  <span className="font-bold text-pink-700 dark:text-pink-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-pink-500" /> Pernikahan Sepupu
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 italic">
              💡 Sentuh nama keluarga di atas untuk melihat satu keluarga secara fokus & rapi.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
