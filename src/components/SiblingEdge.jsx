import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';

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
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-sm">
            <span>Saudara Kandung</span>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
