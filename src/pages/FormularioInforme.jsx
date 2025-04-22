import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './FormularioInforme.css';

const FormularioInforme = ({ actividad, portafolio }) => {
  const [form, setForm] = useState({
    responsable: '',
    objetivo: '',
    resultado: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Informe de Actividad', 14, 20);

    doc.setFontSize(12);
    doc.text(`Portafolio: ${portafolio}`, 14, 30);
    doc.text(`Actividad: ${actividad}`, 14, 38);
    doc.text(`Responsable: ${form.responsable}`, 14, 46);
    doc.text(`Objetivo:`, 14, 54);
    doc.text(form.objetivo, 20, 62);
    doc.text(`Resultado:`, 14, 78);
    doc.text(form.resultado, 20, 86);
    doc.text(`Observaciones:`, 14, 102);
    doc.text(form.observaciones, 20, 110);

    doc.save(`Informe_${actividad}.pdf`);
  };

  return (
    <div className="formulario-informe">
      <h2>Formulario de Informe</h2>
      <label>Responsable:</label>
      <input type="text" name="responsable" value={form.responsable} onChange={handleChange} />

      <label>Objetivo:</label>
      <textarea name="objetivo" rows="3" value={form.objetivo} onChange={handleChange}></textarea>

      <label>Resultado:</label>
      <textarea name="resultado" rows="3" value={form.resultado} onChange={handleChange}></textarea>

      <label>Observaciones:</label>
      <textarea name="observaciones" rows="3" value={form.observaciones} onChange={handleChange}></textarea>

      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
};

export default FormularioInforme;
