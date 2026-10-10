import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Crown, Heart, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export default function Legend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-20 max-w-[280px] sm:max-w-xs transition-all duration-300 select-none">
      <div className="bg-white border-2 border-slate-300 rounded-xl shadow-lg overflow-hidden">
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-xs font-black text-slate-800 hover:text-emerald-700 transition-colors border-b border-slate-200 bg-slate-50"
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Keterangan Warna & Lambang</span>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Content */}
        {isOpen && (
          <div className="p-3 space-y-2.5 text-xs text-slate-800">
            {/* Status & Peran */}
            <div>
              <div className="text-[10px] uppercase font-black text-slate-500 tracking-wider mb-1.5">
                Kategori Anggota
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-zinc-200 border border-zinc-300 flex items-center justify-center text-xs">
                    🕊️
                  </span>
                  <span className="font-bold text-slate-800">Almarhum / Almarhumah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold">
                    <Crown className="w-3 h-3 text-amber-600" />
                  </span>
                  <span className="font-bold text-slate-800">Kakek Moyang (Khairi & Buang)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  </span>
                  <span className="font-bold text-slate-800">Keturunan Langsung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-800">
                    <Heart className="w-3 h-3 text-rose-600" />
                  </span>
                  <span className="font-bold text-slate-800">Pasangan / Menantu</span>
                </div>
              </div>
            </div>

            {/* Garis Hubungan */}
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[10px] uppercase font-black text-slate-500 tracking-wider mb-1.5">
                Garis Hubungan
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-1 bg-emerald-600 rounded" />
                  <span className="font-medium text-slate-700">Orang Tua ke Anak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-0.5 border-t-2 border-dashed border-amber-600" />
                  <span className="font-medium text-slate-700">Saudara Kandung</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-0.5 border-t-2 border-dashed border-pink-500" />
                  <span className="font-bold text-pink-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-pink-500" /> Pernikahan Sepupu
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200 text-[11px] text-slate-500 italic">
              💡 Sentuh nama keluarga di atas untuk melihat satu keluarga secara fokus & rapi.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
