import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

const SystemNode = ({ data }) => {
  const onLabelChange = useCallback((event) => {
    if (data.onLabelChange) {
      data.onLabelChange(event.target.value); // Pass the new label value back to the parent
    }
  }, [data]);

  return (
    <div className="system-node">
      <input
        type="text"
        value={data.label || 'System'}
        onChange={onLabelChange}
        className="nodrag"
        style={{
          border: 'none',
          background: 'transparent',
          textAlign: 'center',
          fontWeight: 'bold',
          width: '100%',
        }}
      />
      {/* Handles positioned on top and bottom */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555', width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: 8, height: 8 }}
      />
    </div>
  );
};

export default SystemNode;
