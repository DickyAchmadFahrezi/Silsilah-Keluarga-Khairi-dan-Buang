import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Crown, Heart, ShieldCheck } from 'lucide-react';

const PersonNode = ({ data, selected }) => {
  const {
    id,
    name,
    root,
    gender,
    role,
    branch,
    generation,
    title,
    isDeceased,
    deceasedLabel,
    isPlaceholder,
    spouses = [],
    isCousinParticipant,
    isFaded,
  } = data;

  const isRoot = Boolean(root);
  const isDirect = role === 'direct';
  const isSpouse = role === 'spouse';

  // Tema warna yang kontras, bersih, ramah mata orang tua (Light Theme)
  let cardBorder = 'border-slate-300';
  let cardBg = 'bg-white';
  let badgeBg = 'bg-slate-100 text-slate-700 border-slate-200';
  let badgeText = 'Keluarga';
  let accentBar = 'bg-slate-400';

  if (isPlaceholder) {
    cardBorder = 'border-dashed border-slate-300';
    cardBg = 'bg-slate-50';
    badgeBg = 'bg-slate-100 text-slate-500 border-slate-200';
    badgeText = 'Belum Ada Data';
    accentBar = 'bg-slate-300';
  } else if (isDeceased) {
    // Almarhum / Almarhumah: Latar abu-abu tenang terhormat
    cardBorder = 'border-zinc-300 shadow-sm';
    cardBg = 'bg-zinc-50/90';
    badgeBg = 'bg-zinc-200 text-zinc-800 border-zinc-300 font-bold';
    badgeText = deceasedLabel === 'Almh.' ? 'Almarhumah' : 'Almarhum';
    accentBar = 'bg-zinc-500';
  } else if (isRoot) {
    // Kakek Moyang
    cardBorder = 'border-amber-400 shadow-md shadow-amber-500/10';
    cardBg = 'bg-amber-50/60';
    badgeBg = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
    badgeText = 'Kakek Moyang';
    accentBar = 'bg-amber-500';
  } else if (isSpouse) {
    // Pasangan / Menantu
    cardBorder = 'border-rose-300 shadow-sm';
    cardBg = 'bg-rose-50/50';
    badgeBg = 'bg-rose-100 text-rose-900 border-rose-300 font-bold';
    badgeText = gender === 'female' ? 'Istri (Menantu)' : 'Suami (Menantu)';
    accentBar = 'bg-rose-400';
  } else {
    // Keturunan Langsung
    cardBorder = 'border-emerald-300 shadow-sm';
    cardBg = 'bg-emerald-50/40';
    badgeBg = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
    badgeText = 'Keturunan Langsung';
    accentBar = 'bg-emerald-500';
  }

  // Teks generasi yang mudah dipahami
  const genLabels = {
    1: 'Generasi 1 (Moyang)',
    2: 'Generasi 2 (Orang Tua)',
    3: 'Generasi 3 (Anak)',
    4: 'Generasi 4 (Cucu)',
    5: 'Generasi 5 (Cicit)',
    6: 'Generasi 6 (Canggah)',
  };
  const genText = genLabels[generation] || `Generasi ${generation || 3}`;

  // Highlight status
  const ringClass = isCousinParticipant
    ? 'ring-4 ring-pink-500 shadow-xl scale-105 z-20'
    : selected
    ? 'ring-4 ring-emerald-500 shadow-lg z-10'
    : '';

  const opacityClass = isFaded ? 'opacity-30 grayscale' : 'opacity-100';

  return (
    <div
      className={`relative w-56 sm:w-60 rounded-2xl border-2 p-3.5 text-left transition-all duration-200 select-none shadow-sm ${cardBg} ${cardBorder} ${ringClass} ${opacityClass}`}
      id={`node-${id}`}
    >
      {/* Handles React Flow */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-3.5 !h-3.5 !bg-emerald-600 !border-2 !border-white !-top-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3.5 !h-3.5 !bg-emerald-600 !border-2 !border-white !-bottom-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-center"
        className="!w-3.5 !h-3.5 !bg-pink-500 !border-2 !border-white !-left-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-center"
        className="!w-3.5 !h-3.5 !bg-pink-500 !border-2 !border-white !-right-2"
      />

      {/* Bagian Atas: Keterangan Generasi & Status Almarhum */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wide">
          G{generation || (isRoot ? 1 : 2)}
        </span>

        {/* Badge Status (Almarhum / Almarhumah / Leluhur) */}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badgeBg}`}>
          {isDeceased && <span>🕊️</span>}
          {isRoot && <Crown className="w-2.5 h-2.5 text-amber-700" />}
          {isSpouse && <Heart className="w-2.5 h-2.5 text-rose-700" />}
          {isDirect && <ShieldCheck className="w-2.5 h-2.5 text-emerald-700" />}
          <span>{badgeText}</span>
        </span>
      </div>

      {/* Nama Lengkap - Huruf Besar & Kontras Tinggi Jelas Terbaca */}
      <div className="space-y-1">
        <h3 className={`text-sm sm:text-base font-extrabold text-slate-900 leading-tight ${
          isPlaceholder ? 'italic text-slate-500 font-normal' : ''
        }`}>
          {name}
        </h3>

        {/* Keterangan Tambahan / Cabang */}
        <p className="text-[11px] text-slate-600 font-semibold leading-snug">
          {isRoot ? (
            <span className="text-amber-800 font-bold">Kakak-Beradik Kandung</span>
          ) : isCousinParticipant ? (
            <span className="text-pink-700 font-bold">Pernikahan Sepupu</span>
          ) : title ? (
            title
          ) : branch ? (
            `Keluarga ${branch}`
          ) : (
            genText
          )}
        </p>
      </div>

      {/* Keterangan Pasangan / Tombol Info */}
      <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
        {spouses && spouses.length > 0 ? (
          <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
            <Heart className="w-3 h-3 fill-rose-600 text-rose-600 shrink-0" />
            <span className="truncate max-w-[120px]">Menikah</span>
          </span>
        ) : (
          <span className="text-slate-500 text-[10px] font-medium">{genText}</span>
        )}

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-md border border-emerald-300">
          Lihat Info 👆
        </span>
      </div>
    </div>
  );
};

export default memo(PersonNode);
