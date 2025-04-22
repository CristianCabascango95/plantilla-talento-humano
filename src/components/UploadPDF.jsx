import React, { useState } from 'react';
import axios from 'axios';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMensaje('Selecciona un archivo PDF');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMensaje(res.data.mensaje);
    } catch (error) {
      setMensaje('Error al subir el archivo');
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Subir archivo PDF</h3>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Subir</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default UploadPDF;
