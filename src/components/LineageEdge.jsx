import React from 'react';
import { BaseEdge, getBezierPath } from '@xyflow/react';

export default function LineageEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = {},
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.25,
  });

  const isCousinParticipant = Boolean(data.isCousinParticipant);

  return (
    <BaseEdge
      path={edgePath}
      id={id}
      style={{
        ...style,
        stroke: isCousinParticipant ? '#0284c7' : '#059669',
        strokeWidth: isCousinParticipant ? 3.5 : 2.5,
        strokeDasharray: isCousinParticipant ? '5 3' : 'none',
      }}
      markerEnd={markerEnd}
    />
  );
}
