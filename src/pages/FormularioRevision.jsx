import React, { useState } from 'react';
import jsPDF from 'jspdf';

const FormularioRevision = ({ actividad, portafolio }) => {
  const [form, setForm] = useState({
    responsable: '',
    documentosRevisados: '',
    hallazgos: '',
    recomendaciones: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Revisión de Informes', 14, 20);
    doc.text(`Actividad: ${actividad}`, 14, 30);
    doc.text(`Portafolio: ${portafolio}`, 14, 38);
    doc.text(`Responsable: ${form.responsable}`, 14, 46);
    doc.text(`Documentos revisados:`, 14, 54);
    doc.text(form.documentosRevisados, 20, 62);
    doc.text(`Hallazgos:`, 14, 78);
    doc.text(form.hallazgos, 20, 86);
    doc.text(`Recomendaciones:`, 14, 102);
    doc.text(form.recomendaciones, 20, 110);
    doc.save(`Informe_Revision.pdf`);
  };

  return (
    <div>
      <h2>Informe de Revisión</h2>
      <input name="responsable" placeholder="Responsable" onChange={handleChange} />
      <textarea name="documentosRevisados" placeholder="Documentos revisados" onChange={handleChange}></textarea>
      <textarea name="hallazgos" placeholder="Hallazgos encontrados" onChange={handleChange}></textarea>
      <textarea name="recomendaciones" placeholder="Recomendaciones" onChange={handleChange}></textarea>
      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
};

export default FormularioRevision;
