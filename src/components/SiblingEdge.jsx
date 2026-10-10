import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { Crown } from 'lucide-react';

export default function SiblingEdge({
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
    borderRadius: 20,
  });

  const isCousinParticipant = Boolean(data.isCousinParticipant);

  return (
    <>
      <BaseEdge
        path={edgePath}
        id={id}
        style={{
          ...style,
          stroke: '#b45309',
          strokeWidth: isCousinParticipant ? 3.5 : 2.5,
          strokeDasharray: '6 4',
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
          <div className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-900 border-2 border-amber-400 flex items-center gap-1.5 shadow-md">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>👑 Saudara Kandung (Kakak-Beradik)</span>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
