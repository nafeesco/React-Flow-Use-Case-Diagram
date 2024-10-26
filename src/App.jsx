import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  MarkerType,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ActorNode from './ActorNode';
import UseCaseNode from './UseCaseNode';
import MisuseCaseNode from './MisuseCaseNode';
import SystemNode from './SystemNode';
import CollaborationNode from './CollaborationNode';
import ExportDiagram from './ExportDiagram'; // Import the ExportDiagram component

const handleStyle = { left: 10 };

const DiagramBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedEdgeType, setSelectedEdgeType] = useState('normal');
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdgeLabel, setSelectedEdgeLabel] = useState('include');

  const nodeTypes = {
    actor: ActorNode,
    useCase: UseCaseNode,
    misuseCase: MisuseCaseNode,
    system: SystemNode,
    collaboration: CollaborationNode,
  };

  const addNode = (nodeType) => {
    const id = `node_${+new Date()}`;
    const newNode = {
      id,
      type: nodeType,
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: {
        label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
        onLabelChange: (newLabel) => {
          setNodes((nds) =>
            nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node))
          );
        },
      },
      style: nodeTypes[nodeType].style,
    };
    setNodes((nds) => [...nds, newNode]);
  };

 // Adding edges based on the selected type
 const onConnect = useCallback(
  (params) => {
    let edgeLabel = '';
    let edgeStyle = { strokeDasharray: '0' }; // Default solid line
    let markerEnd = null; // Default no arrow

    // Set style and label based on selected edge type
    if (selectedEdgeType === 'dependency') {
      // Dashed arrow without label
      edgeStyle = { strokeDasharray: '5,5' };
      markerEnd = { type: MarkerType.ArrowClosed };
    } else if (selectedEdgeType === 'include') {
      // Dashed arrow labeled 'include'
      edgeStyle = { strokeDasharray: '5,5' };
      edgeLabel = 'include';
      markerEnd = { type: MarkerType.ArrowClosed };
    } else if (selectedEdgeType === 'extend') {
      // Dashed arrow labeled 'extend'
      edgeStyle = { strokeDasharray: '5,5' };
      edgeLabel = 'extend';
      markerEnd = { type: MarkerType.ArrowClosed };
    }
    // "Association" type has no arrow
    else if (selectedEdgeType === 'normal') {
      edgeStyle = { strokeDasharray: '0' }; // Solid line, no arrow
      markerEnd = null;
    }

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          style: edgeStyle,
          markerEnd,
          label: edgeLabel,
          labelStyle: {
            fill: '#000',
            fontWeight: 600,
            fontSize: 12,
          },
        },
        eds
      )
    );
  },
  [setEdges, selectedEdgeType]
);


  const onNodeClick = (event, node) => {
    setSelectedNode(node.id);
  };

  const onEdgeClick = (event, edge) => {
    setSelectedNode(edge.id);
  };

  const deleteSelected = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedNode && edge.source !== selectedNode && edge.target !== selectedNode));
      setSelectedNode(null);
    }
  };

  const exportAsImage = () => {
    const element = document.querySelector('.react-flow');
    setTimeout(() => {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'use_case_diagram.png';
        link.click();
      });
    }, 100); // Delay of 100 milliseconds
  };
  
  const exportAsPDF = () => {
    const pdf = new jsPDF('landscape');
    const element = document.querySelector('.react-flow');
    setTimeout(() => {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('use_case_diagram.pdf');
      });
    }, 100); // Delay of 100 milliseconds
  };
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: '20%',
          backgroundColor: '#f3f3f3',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <h3 style= {{textAlign: 'center'}}>Use Case Diagram</h3>
        <button onClick={() => addNode('actor')}>Actor</button>
        <button onClick={() => addNode('useCase')}>Use Case</button>
        <button onClick={() => addNode('misuseCase')}>Misuse Case</button>
        <button onClick={() => addNode('system')}>System</button>
        <button onClick={() => addNode('collaboration')}>Collaboration</button>

        <button
        style={{ backgroundColor: '#8B0000', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }} 
         onClick={deleteSelected} disabled={!selectedNode}>Delete Selected</button>

        <h4>Edge Type</h4>
        <div>
          <label className="radio-label">
            <input
              type="radio"
              name="edgeType"
              value="normal"
              checked={selectedEdgeType === 'normal'}
              onChange={() => setSelectedEdgeType('normal')}
            />
            Association
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="edgeType"
              value="dependency"
              checked={selectedEdgeType === 'dependency'}
              onChange={() => setSelectedEdgeType('dependency')}
            />
            Dependency
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="edgeType"
              value="include"
              checked={selectedEdgeType === 'include'}
              onChange={() => setSelectedEdgeType('include')}
            />
            Include
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="edgeType"
              value="extend"
              checked={selectedEdgeType === 'extend'}
              onChange={() => setSelectedEdgeType('extend')}
            />
            Extend
          </label>
        </div>

        {/* Export Buttons at the Bottom of the Toolbar */}
        <div style={{ marginTop: 'auto' }}>
          <button onClick={exportAsImage} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', width: '100%', marginBottom: '10px' }}>
            Export as PNG
          </button>
          <button onClick={exportAsPDF} style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', width: '100%' }}>
            Export as PDF
          </button>
        </div>


        {/* <h4>Edge Label</h4> */}
        {/* <div>
          <label>
            <input
              type="radio"
              name="edgeLabel"
              value="include"
              checked={selectedEdgeLabel === 'include'}
              onChange={() => setSelectedEdgeLabel('include')}
            />
            Include
          </label>
          <label>
            <input
              type="radio"
              name="edgeLabel"
              value="exclude"
              checked={selectedEdgeLabel === 'exclude'}
              onChange={() => setSelectedEdgeLabel('exclude')}
            />
            Exclude
          </label>
        </div> */}
      </div>

      <div style={{ width: '80%', height: '100%' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitView
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DiagramBuilder;
