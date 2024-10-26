import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';


const UseCaseNode = ({ data, isConnectable }) => {
  const onChange = useCallback((event) => {
    // Call the update function passed down from React Flow to update the node's data
    data.onLabelChange(event.target.value);
  }, [data]);

  return (
    <div className="use-case-node">
      {/* Editable input for the label */}
      <input
        type="text"
        value={data.label || 'Use Case'}
        onChange={onChange}
        className="node-input" // Add a class for styling
      />
      {/* Handles positioned on top and bottom */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />

      {/* <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      /> */}
    </div>
  );
};

export default UseCaseNode;
