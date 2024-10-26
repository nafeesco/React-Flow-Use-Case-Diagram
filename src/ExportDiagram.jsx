import React from 'react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportDiagram = ({ reactFlowInstance }) => {
  const exportToPNG = async () => {
    if (!reactFlowInstance) return;

    const element = reactFlowInstance.toObject();
    const canvas = await html2canvas(element, { useCORS: true });
    canvas.toBlob((blob) => {
      saveAs(blob, 'use_case_diagram.png');
    });
  };

  const exportToPDF = async () => {
    if (!reactFlowInstance) return;

    const element = reactFlowInstance.toObject();
    const canvas = await html2canvas(element, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('use_case_diagram.pdf');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button 
        onClick={exportToPNG}
        style={{ marginBottom: '10px' }} // Space between buttons
      >
        Export as PNG
      </button>
      <button 
        onClick={exportToPDF}
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ExportDiagram;
