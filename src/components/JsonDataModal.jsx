import React, { useState } from 'react';
import { familyData } from '../data';

export default function JsonDataModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(familyData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl overflow-hidden bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-850/80">
          <div>
            <h3 className="text-lg font-bold text-white">Struktur Data Silsilah (JSON)</h3>
            <p className="text-xs text-slate-400">Berkas sumber: <code className="text-emerald-400">src/data.js</code></p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all"
            >
              {copied ? 'Tersalin!' : 'Salin JSON'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-lg font-bold leading-none"
              aria-label="Tutup"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-5 py-3 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-300">
          <span>
            Data ini tanpa database. Anda dapat memodifikasi array di <code>src/data.js</code> kapan saja. Relasi sepupu antara Hanifah & Madji terdeteksi otomatis.
          </span>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed selection:bg-emerald-600">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Total {familyData.length} anggota keluarga
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
