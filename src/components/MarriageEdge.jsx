import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { Heart, Sparkles } from 'lucide-react';

export default function MarriageEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data = {},
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const isCousin = Boolean(data.isCousin);
  const isCousinParticipant = Boolean(data.isCousinParticipant);

  const strokeColor = isCousin ? '#db2777' : '#e11d48';

  return (
    <>
      <BaseEdge
        path={edgePath}
        id={id}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth: isCousinParticipant ? 3.5 : isCousin ? 3 : 2.5,
          strokeDasharray: isCousin ? '6 4' : '4 4',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {isCousin ? (
            <div className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md border transition-all ${
              isCousinParticipant
                ? 'bg-pink-600 text-white border-pink-700 ring-2 ring-pink-400 scale-105'
                : 'bg-white dark:bg-slate-900 text-pink-700 dark:text-pink-300 border-pink-400 dark:border-pink-800 hover:scale-105'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-current animate-pulse" />
              <span>💍 Pernikahan Sepupu</span>
            </div>
          ) : (
            <div className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1 shadow-sm">
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              <span>Menikah</span>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
