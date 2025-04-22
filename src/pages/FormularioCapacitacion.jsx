import React, { useState } from 'react';
import jsPDF from 'jspdf';

const FormularioCapacitacion = ({ actividad, portafolio }) => {
  const [form, setForm] = useState({
    responsable: '',
    tema: '',
    asistentes: '',
    materiales: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Capacitación', 14, 20);
    doc.text(`Actividad: ${actividad}`, 14, 30);
    doc.text(`Portafolio: ${portafolio}`, 14, 38);
    doc.text(`Responsable: ${form.responsable}`, 14, 46);
    doc.text(`Tema: ${form.tema}`, 14, 54);
    doc.text(`Asistentes: ${form.asistentes}`, 14, 62);
    doc.text(`Materiales usados:`, 14, 70);
    doc.text(form.materiales, 20, 78);
    doc.text(`Observaciones:`, 14, 94);
    doc.text(form.observaciones, 20, 102);
    doc.save(`Informe_Capacitacion.pdf`);
  };

  return (
    <div>
      <h2>Informe de Capacitación</h2>
      <input name="responsable" placeholder="Responsable" onChange={handleChange} />
      <input name="tema" placeholder="Tema de la capacitación" onChange={handleChange} />
      <input name="asistentes" placeholder="Número de asistentes" onChange={handleChange} />
      <textarea name="materiales" placeholder="Materiales usados" onChange={handleChange}></textarea>
      <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange}></textarea>
      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
};

export default FormularioCapacitacion;
