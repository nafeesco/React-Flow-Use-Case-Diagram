import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';


const MisuseCaseNode = ({ data, isConnectable }) => {
    const onChange = useCallback((event) => {
      const newLabel = event.target.value.trim(); // Get the new label and trim whitespace
      // Update the label only if it's not empty; otherwise, you might want to set it to a default value
      if (newLabel) {
        data.onLabelChange(newLabel);
      } else {
        data.onLabelChange('Misuse Case'); // Set to default label when input is empty
      }
    }, [data]);
    
    return (
      <div className="misuse-case-node">
        <input
          type="text"
          value={data.label || 'Misuse Case'}
          onChange={onChange}
          className="misuse-node-input"
        />
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
      </div>
    );
  };
  
export default MisuseCaseNode;
