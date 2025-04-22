import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './FormularioPorTipo.css';

const FormularioPorTipo = ({ tipo, actividad, portafolio }) => {
  const plantillas = {
    "Gestión de respaldos y pruebas de recuperación.": {
      campos: [
        { nombre: "responsable", etiqueta: "Responsable de la actividad", tipo: "text" },
        { nombre: "objetivo", etiqueta: "Objetivo del respaldo", tipo: "textarea" },
        { nombre: "tipoRespaldo", etiqueta: "Tipo de respaldo", tipo: "select", opciones: ["Completo", "Incremental", "Diferencial"] },
        { nombre: "fecha", etiqueta: "Fecha de ejecución", tipo: "date" },
        { nombre: "resultado", etiqueta: "Resultado de la prueba de recuperación", tipo: "textarea" },
        { nombre: "observaciones", etiqueta: "Observaciones técnicas", tipo: "textarea" },
      ]
    },
    // Puedes agregar más plantillas aquí
  };

  const campos = plantillas[tipo]?.campos || [
    // Plantilla genérica si no se encuentra el tipo
    { nombre: "responsable", etiqueta: "Responsable", tipo: "text" },
    { nombre: "objetivo", etiqueta: "Objetivo", tipo: "textarea" },
    { nombre: "resultado", etiqueta: "Resultado", tipo: "textarea" },
    { nombre: "observaciones", etiqueta: "Observaciones", tipo: "textarea" },
  ];

  const [form, setForm] = React.useState(() =>
    Object.fromEntries(campos.map(campo => [campo.nombre, '']))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Informe de Actividad', 14, 20);

    doc.setFontSize(12);
    doc.text(`Portafolio: ${portafolio}`, 14, 30);
    doc.text(`Actividad: ${actividad}`, 14, 38);

    let y = 46;
    campos.forEach(campo => {
      const etiqueta = campo.etiqueta;
      const valor = form[campo.nombre] || '';
      doc.text(`${etiqueta}:`, 14, y);
      const texto = doc.splitTextToSize(valor, 180);
      doc.text(texto, 20, y + 8);
      y += texto.length * 7 + 12;
    });

    doc.save(`Informe_${actividad}.pdf`);
  };

  return (
    <div className="formulario-tipo">
      {campos.map(campo => (
        <div key={campo.nombre} className="campo-formulario">
          <label>{campo.etiqueta}:</label>
          {campo.tipo === 'textarea' ? (
            <textarea
              name={campo.nombre}
              value={form[campo.nombre]}
              onChange={handleChange}
            />
          ) : campo.tipo === 'select' ? (
            <select
              name={campo.nombre}
              value={form[campo.nombre]}
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
              {campo.opciones.map((opcion, i) => (
                <option key={i} value={opcion}>{opcion}</option>
              ))}
            </select>
          ) : (
            <input
              type={campo.tipo}
              name={campo.nombre}
              value={form[campo.nombre]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <button className="btn generar" onClick={generarPDF}>Generar PDF</button>
    </div>
  );
};

export default FormularioPorTipo;
