import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Repositorio.css';

const Repositorio = () => {
  const [archivos, setArchivos] = useState([]);
  const [archivo, setArchivo] = useState(null);

  const fetchArchivos = () => {
    axios.get('http://localhost:5000/api/repositorio')
      .then(res => setArchivos(res.data.reverse())) // mostrar primero los más recientes
      .catch(err => console.error('Error al cargar archivos:', err));
  };

  useEffect(() => {
    fetchArchivos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!archivo) return;

    const formData = new FormData();
    formData.append('archivo', archivo);

    await axios.post('http://localhost:5000/api/repositorio', formData);
    setArchivo(null);
    fetchArchivos();
  };

  const handleDelete = async (filename) => {
    await axios.delete(`http://localhost:5000/api/repositorio/${filename}`);
    fetchArchivos();
  };

  return (
    <div className="repositorio-container">
      <h2>Repositorio de Documentos</h2>

      <div className="archivo-grid">
        {archivos.map((file, idx) => (
          <div key={idx} className="archivo-card">
            <h4>{file.name}</h4>
            <p>Subido: {new Date(file.date).toLocaleString()}</p>
            <div className="archivo-card-actions">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="ver-btn">Ver</a>
              <button onClick={() => handleDelete(file.name)} className="eliminar-btn">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" accept="application/pdf" onChange={e => setArchivo(e.target.files[0])} />
        <button type="submit" className="subir-btn">Subir PDF</button>
      </form>
    </div>
  );
};

export default Repositorio;
