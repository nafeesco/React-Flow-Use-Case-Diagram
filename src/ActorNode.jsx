import React, { useState } from 'react'; // Import useState
import { Handle, Position } from '@xyflow/react'; // Import Handle and Position

const ActorNode = ({ data }) => {
  const [label, setLabel] = useState(data.label); // Create state for the label

  return (
    <div
      className="actor-node"
      style={{
        width: 60,
        height: 100,
        textAlign: 'center',
        borderRadius: '50%', // Make the border elliptical
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Handles for connection */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* SVG for the stick figure */}
      <svg height="70" width="60" viewBox="0 0 50 100">
        {/* Head */}
        <circle cx="25" cy="20" r="10" fill="black" />
        {/* Body */}
        <line x1="25" y1="30" x2="25" y2="60" stroke="black" strokeWidth="2" />
        {/* Arms */}
        <line x1="25" y1="40" x2="10" y2="50" stroke="black" strokeWidth="2" />
        <line x1="25" y1="40" x2="40" y2="50" stroke="black" strokeWidth="2" />
        {/* Legs */}
        <line x1="25" y1="60" x2="15" y2="80" stroke="black" strokeWidth="2" />
        <line x1="25" y1="60" x2="35" y2="80" stroke="black" strokeWidth="2" />
      </svg>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)} // Update the label state on change
        className="node-input"
        style={{
          width: '100%',
          textAlign: 'center',
          border: 'none',
          outline: 'none',
          fontSize: '14px',
          padding: '2px',
        }}
      />
    </div>
  );
};

export default ActorNode;
