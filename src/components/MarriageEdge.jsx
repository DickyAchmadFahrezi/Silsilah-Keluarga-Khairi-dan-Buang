import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';

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
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-all ${
              isCousinParticipant
                ? 'bg-pink-600 text-white border-pink-700 shadow-md ring-1 ring-pink-400'
                : 'bg-white dark:bg-slate-900 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800 shadow-sm'
            }`}>
              <span>Pernikahan Sepupu</span>
            </div>
          ) : (
            <div className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-sm">
              <span>Menikah</span>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
