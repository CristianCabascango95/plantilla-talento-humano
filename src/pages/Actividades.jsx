import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Actividades.css';

const Actividades = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activity = location.state?.activity;
  const portafolio = location.state?.portafolio || 'Sin nombre';

  const [form, setForm] = React.useState({
    responsable: '',
    objetivo: '',
    resultado: '',
    observaciones: '',
  });

  if (!activity) {
    return (
      <div className="actividad-container">
        <p>No se proporcionó ninguna actividad.</p>
        <button onClick={() => navigate('/dashboard')}>Volver</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Informe de Actividad', 14, 20);

    doc.setFontSize(12);
    doc.text(`Portafolio: ${portafolio}`, 14, 30);
    doc.text(`Actividad: ${activity}`, 14, 38);
    doc.text(`Responsable: ${form.responsable}`, 14, 46);
    doc.text('Objetivo:', 14, 54);
    doc.text(doc.splitTextToSize(form.objetivo, 180), 20, 62);

    const resultadoY = 62 + doc.splitTextToSize(form.objetivo, 180).length * 7 + 6;
    doc.text('Resultado:', 14, resultadoY);
    doc.text(doc.splitTextToSize(form.resultado, 180), 20, resultadoY + 8);

    const observacionesY = resultadoY + doc.splitTextToSize(form.resultado, 180).length * 7 + 12;
    doc.text('Observaciones:', 14, observacionesY);
    doc.text(doc.splitTextToSize(form.observaciones, 180), 20, observacionesY + 8);

    doc.save(`Informe_${activity}.pdf`);
  };

  return (
    <div className="actividad-container">
      <div className="actividad-card">
        <h2>Informe de la Actividad</h2>
        <p><strong>Actividad seleccionada:</strong> {activity}</p>
        <p><strong>Portafolio:</strong> {portafolio}</p>

        <label>Responsable:</label>
        <input
          type="text"
          name="responsable"
          value={form.responsable}
          onChange={handleChange}
        />

        <label>Objetivo:</label>
        <textarea
          name="objetivo"
          value={form.objetivo}
          onChange={handleChange}
        />

        <label>Resultado:</label>
        <textarea
          name="resultado"
          value={form.resultado}
          onChange={handleChange}
        />

        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
        />

        <div className="acciones">
          <button className="btn back" onClick={() => navigate('/dashboard')}>Volver</button>
          <button className="btn generar" onClick={generarPDF}>Generar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Actividades;
