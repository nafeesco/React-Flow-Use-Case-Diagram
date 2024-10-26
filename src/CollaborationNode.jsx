import React, { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const Collaboration = ({ data }) => {
  // Use local state to manage the editable label
  const [label, setLabel] = useState(data.label || 'Collaboration');

  const onLabelChange = useCallback((newLabel) => {
    setLabel(newLabel);
    if (data.onLabelChange) {
      data.onLabelChange(newLabel); // Pass the new label value back to the parent
    }
  }, [data]);

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior
      onLabelChange(label); // Update label on Enter key press
    }
  };

  return (
    <div className="collaboration-node">
      <input
        type="text"
        value={label}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add keydown handler
        className="nodrag"
        style={{
          border: 'none',
          background: 'transparent',
          textAlign: 'center',
          fontWeight: 'bold',
          width: '100%',
        }}
      />
      {/* Handles positioned on the left and right */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', width: 8, height: 8 }}
      />
    </div>
  );
};

export default Collaboration;
