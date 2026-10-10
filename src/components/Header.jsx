import React from 'react';
import { Search, Sparkles, RotateCcw, BookOpen, GitFork, X } from 'lucide-react';

export default function Header({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  isCousinHighlight,
  toggleCousinHighlight,
  onResetView,
}) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Judul & Penjelasan */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-emerald-700">🌳 Silsilah Khairi & Buang</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold">
              Keluarga Besar Haji Madji & Haja Hanifah (13 Anak & Keturunannya)
            </p>
          </div>

          {/* Mode Switcher di HP */}
          <div className="flex sm:hidden items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'tree'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌳 Bagan
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📖 Daftar
            </button>
          </div>
        </div>

        {/* Mode Switcher Desktop & Pencarian */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mode Switcher Desktop */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('tree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'tree'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Bagan Pohon</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Daftar Silsilah (Buku)</span>
            </button>
          </div>

          {/* Kolom Pencarian */}
          <div className="relative flex-1 sm:w-56 min-w-[140px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama keluarga..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tombol Sorot Pernikahan Sepupu */}
          {viewMode === 'tree' && (
            <button
              onClick={toggleCousinHighlight}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 shadow-sm ${
                isCousinHighlight
                  ? 'bg-pink-600 text-white border-pink-700 shadow-pink-600/30'
                  : 'bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100'
              }`}
              title="Sorot alur pernikahan sepupu Haja Hanifah & Haji Madji"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pernikahan</span> Sepupu
            </button>
          )}

          {/* Tombol Pusatkan Layar */}
          {viewMode === 'tree' && (
            <button
              onClick={onResetView}
              className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 shrink-0 shadow-sm"
              title="Pusatkan Tampilan Layar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
