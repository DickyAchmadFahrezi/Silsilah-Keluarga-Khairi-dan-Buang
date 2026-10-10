import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Sparkles, RotateCcw, BookOpen, GitFork, X, ArrowRight, Sun, Moon, Code } from 'lucide-react';
import { familyData } from '../data';

export default function Header({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  isCousinHighlight,
  toggleCousinHighlight,
  onResetView,
  onSelectPerson,
  isDarkMode,
  toggleDarkMode,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Cari hasil instan secara global di familyData (mendukung pencarian haji -> h. & haja -> hj.)
  const searchResults = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q || q.length < 2) return [];
    const normalizedQ = q.replace(/\bhaji\b/g, 'h.').replace(/\bhaja\b/g, 'hj.').trim();
    return familyData
      .filter((p) => {
        if (p.isPlaceholder) return false;
        const n = (p.name || '').toLowerCase();
        const rn = (p.rawName || '').toLowerCase();
        const nameMatch = n.includes(q) || n.includes(normalizedQ);
        const rawNameMatch = rn.includes(q) || rn.includes(normalizedQ);
        return nameMatch || rawNameMatch;
      })
      .slice(0, 8); // Tampilkan maksimal 8 saran teratas
  }, [searchQuery]);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChoosePerson = (person) => {
    setIsDropdownOpen(false);
    if (onSelectPerson) {
      onSelectPerson(person);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleChoosePerson(searchResults[0]);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-3 shadow-sm select-none transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Baris Atas: Judul, Pembuat Web, Mode Switcher & Aksi */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo, Judul Silsilah & Badge Pembuat Web */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400">🌳 Silsilah Khairi & Buang</span>
                </h1>
                
                {/* Badge Pembuat Web & Hak Cipta: Dicky Achmad Fahrezi */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-[11px] font-bold shadow-xs">
                  <Code className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>© Pembuat Web:</span>
                  <strong className="text-emerald-950 dark:text-emerald-100 font-extrabold underline decoration-emerald-400">
                    Dicky Achmad Fahrezi
                  </strong>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Keluarga Besar H. Madji & HJ. Hanifah (14 Anak & Keturunannya)
              </p>
            </div>

            {/* Tombol Aksi Cepat di Layar Kecil (Mobile) */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              {/* Toggle Dark Mode HP */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl text-xs font-bold border transition-all bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-amber-300"
                title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {viewMode === 'tree' && (
                <>
                  <button
                    onClick={toggleCousinHighlight}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                      isCousinHighlight
                        ? 'bg-pink-600 text-white border-pink-700'
                        : 'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800'
                    }`}
                    title="Sorot Pernikahan Sepupu"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onResetView}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shrink-0"
                    title="Pusatkan Tampilan Layar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tombol Bagan & Daftar (BESAR & JELAS DENGAN DUKUNGAN MODE GELAP) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-inner w-full md:w-auto justify-center transition-colors">
            <button
              onClick={() => setViewMode('tree')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-all active:scale-95 ${
                viewMode === 'tree'
                  ? 'bg-emerald-600 dark:bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <GitFork className="w-5 h-5 shrink-0" />
              <span>🌳 Bagan Pohon</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-all active:scale-95 ${
                viewMode === 'list'
                  ? 'bg-emerald-600 dark:bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>📖 Daftar Silsilah</span>
            </button>
          </div>

          {/* Tombol Aksi di Layar Besar (Desktop) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Toggle Mode Gelap Desktop */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shadow-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-amber-300 border-slate-300 dark:border-slate-700 active:scale-95 shrink-0"
              title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span>Mode Gelap</span>
                </>
              )}
            </button>

            {viewMode === 'tree' && (
              <>
                <button
                  onClick={toggleCousinHighlight}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 shadow-sm ${
                    isCousinHighlight
                      ? 'bg-pink-600 text-white border-pink-700 shadow-pink-600/30'
                      : 'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/50'
                  }`}
                  title="Sorot alur pernikahan sepupu HJ. Hanifah & H. Madji"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pernikahan Sepupu</span>
                </button>

                <button
                  onClick={onResetView}
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 shrink-0 shadow-sm"
                  title="Pusatkan Tampilan Layar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Baris Bawah: Form Pencarian & Tombol Cari (BESAR, JELAS & RESPONSIVE) */}
        <div ref={searchContainerRef} className="relative w-full">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                placeholder="Cari nama keluarga (misal: Ahmad Kurniawan, Abu Hanifah, Maryamah)..."
                className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
                  title="Hapus pencarian"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Tombol CARI yang Nyata, Besar & Mudah Ditekan */}
            <button
              type="submit"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-md shadow-emerald-700/25 transition-all shrink-0 cursor-pointer"
              title="Tekan untuk mencari"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Cari</span>
            </button>
          </form>

          {/* Dropdown Hasil Pencarian Langsung */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/70 border-b border-emerald-200 dark:border-emerald-800 text-xs font-black text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>Ditemukan {searchResults.length} Anggota Keluarga:</span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-normal">Klik untuk langsung membuka</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleChoosePerson(item)}
                    className="w-full px-4 py-3 text-left hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                          {item.name}
                        </span>
                        {item.isDeceased && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-bold">
                            🕊️ Alm.
                          </span>
                        )}
                        {item.branch && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                            {item.branch}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.group === 'cabang_b' ? 'Cabang B (Madji & Hanifah)' : item.group === 'cabang_a' ? 'Cabang A (Abdul Ghani)' : 'Leluhur'} • Generasi {item.generation || 3}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
