import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Repositorio.css';

const Repositorio = () => {
  const [archivos, setArchivos] = useState([]);
  const [archivo, setArchivo] = useState(null);

  const fetchArchivos = () => {
    axios.get('http://localhost:5000/api/repositorio')
      .then(res => setArchivos(res.data))
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
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" accept="application/pdf" onChange={e => setArchivo(e.target.files[0])} />
        <button type="submit">Subir PDF</button>
      </form>

      <ul className="archivo-lista">
        {archivos.map((file, idx) => (
          <li key={idx} className="archivo-item">
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
            <span>{new Date(file.date).toLocaleString()}</span>
            <button onClick={() => handleDelete(file.name)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repositorio;
