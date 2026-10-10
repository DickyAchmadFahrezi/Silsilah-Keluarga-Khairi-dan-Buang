import React from 'react';
import { X, Crown, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { getParents, getSpouses, getSiblings, getChildren, isCousinMarriage } from '../data';

export default function PersonDetailModal({ person, onClose, onSelectPerson }) {
  if (!person) return null;

  const parents = getParents(person.id);
  const spouses = getSpouses(person.id);
  const siblings = getSiblings(person.id);
  const children = getChildren(person.id);

  const isRoot = Boolean(person.root);
  const isSpouse = person.role === 'spouse';
  const isDeceased = Boolean(person.isDeceased);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white border-t sm:border border-slate-300 rounded-t-2xl sm:rounded-2xl shadow-2xl transition-all max-h-[85vh] flex flex-col text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profil */}
        <div className="relative p-5 pb-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            aria-label="Tutup"
            id="btn-close-modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3.5 pr-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black shadow-sm border shrink-0 ${
              isDeceased
                ? 'bg-zinc-200 text-zinc-800 border-zinc-400'
                : isRoot
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : isSpouse
                ? 'bg-rose-100 text-rose-900 border-rose-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}>
              {person.isPlaceholder ? '?' : person.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-slate-200 text-slate-800">
                  Generasi {person.generation || (isRoot ? 1 : 2)}
                </span>
                
                {isDeceased ? (
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-zinc-200 text-zinc-800 border border-zinc-300 flex items-center gap-1">
                    <span>🕊️</span>
                    <span>{person.deceasedLabel === 'Almh.' ? 'Almarhumah' : 'Almarhum'}</span>
                  </span>
                ) : isRoot ? (
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-100 text-amber-900 border border-amber-300">
                    Kakek Moyang
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Keturunan Langsung
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 truncate">
                {person.name}
              </h2>
              {person.branch && (
                <p className="text-xs text-slate-600 font-semibold truncate">
                  Bagian dari: <span className="text-emerald-800 font-bold">Keluarga {person.branch}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Isi Modal (Scrollable) */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Biografi / Catatan Singkat */}
          {person.bio && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-900 block mb-1">Keterangan:</span>
              {person.bio}
            </div>
          )}

          {/* Hubungan Keluarga Grid */}
          <div className="space-y-3.5">
            {/* Orang Tua */}
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                Orang Tua:
              </h4>
              {parents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {parents.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectPerson(p)}
                      className="p-3 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 flex items-center justify-between group transition-all"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{p.isDeceased ? `(${p.deceasedLabel || 'Alm.'})` : p.title || 'Orang Tua'}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  {isRoot ? 'Leluhur Generasi Pertama (Akar Silsilah).' : 'Belum tercatat orang tua.'}
                </p>
              )}
            </div>

            {/* Pasangan (Spouses) */}
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                Pasangan (Suami / Istri):
              </h4>
              {spouses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {spouses.map((s) => {
                    const isCousin =
                      (person.id === 'hanifah' && s.id === 'madji') ||
                      (person.id === 'madji' && s.id === 'hanifah') ||
                      isCousinMarriage(person.id, s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => onSelectPerson(s)}
                        className={`p-3 text-left rounded-xl border flex items-center justify-between group transition-all ${
                          isCousin
                            ? 'bg-pink-50 hover:bg-pink-100 border-pink-300'
                            : 'bg-slate-50 hover:bg-rose-50 border-slate-200 hover:border-rose-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-rose-900 truncate">{s.name}</div>
                          {isCousin ? (
                            <div className="text-[10px] font-bold text-pink-700 flex items-center gap-1 mt-0.5">
                              <span>💍 Pernikahan Sepupu</span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500">{s.isDeceased ? `(${s.deceasedLabel || 'Alm.'})` : 'Pasangan'}</div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">Belum tercatat pasangan.</p>
              )}
            </div>

            {/* Saudara Kandung */}
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                Saudara Kandung ({siblings.length}):
              </h4>
              {siblings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                  {siblings.map((sib) => (
                    <button
                      key={sib.id}
                      onClick={() => onSelectPerson(sib)}
                      className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between group transition-all"
                    >
                      <div className="min-w-0 pr-1">
                        <div className="text-xs font-bold text-slate-800 truncate">{sib.name}</div>
                        {sib.isDeceased && <div className="text-[10px] text-zinc-600">({sib.deceasedLabel || 'Alm.'})</div>}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">Tidak ada saudara sekandung tercatat.</p>
              )}
            </div>

            {/* Anak-anak */}
            {children.length > 0 && (
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Keturunan / Anak ({children.length}):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {children.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => onSelectPerson(ch)}
                      className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 flex items-center justify-between group transition-all"
                    >
                      <div className="min-w-0 pr-1">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">{ch.name}</div>
                        {ch.isDeceased && <div className="text-[10px] text-zinc-600">({ch.deceasedLabel || 'Alm.'})</div>}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-900 text-white transition-colors text-center shadow"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
