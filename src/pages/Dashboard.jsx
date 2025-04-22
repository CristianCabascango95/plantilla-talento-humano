import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import fondo from '../assets/PREFECTURA-DE-COTOPAXI.png';

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/talento-humano')
      .then(res => {
        const raw = res.data;
        const groups = {};
        let currentPort = '';

        raw.forEach(item => {
          const port = item['PORTAFOLIO DE PRODUCTOS O SERVICIOS']?.trim();
          const act = item['ACTIVIDADES SECUENCIALES']?.trim();

          if (port) {
            currentPort = port;
            if (!groups[currentPort]) groups[currentPort] = [];
          }
          if (act && currentPort) {
            groups[currentPort].push(act);
          }
        });

        const arr = Object.keys(groups).map(name => ({
          name,
          activities: groups[name],
        }));

        setPortfolios(arr);
        if (arr.length) setSelected(arr[0].name);
      })
      .catch(err => console.error('Error al obtener talento humano:', err));
  }, []);

  const handleActivityClick = (activity) => {
    navigate('/actividades', { state: { activity } });
  };

  return (
    <div className="dashboard">
      
      <aside className="sidebar">
        <img
          src="https://cotopaxi.gob.ec/test.cotopaxi.gob.ec/wp-content/uploads/2024/09/Captura-de-pantalla-2024-09-14-a-las-13.59.13.png"
          alt="Logo"
          className="logo"
        />

        <h3>Portafolios</h3>

        {/* Botón Repositorio */}
        <button
          className="repositorio-btn-sidebar"
          onClick={() => navigate('/repositorio')}
        >
          Repositorio
        </button>

        <ul>
          {portfolios.map(p => (
            <li
              key={p.name}
              className={selected === p.name ? 'active' : ''}
              onClick={() => setSelected(p.name)}
            >
              {p.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        <h3>Actividades de: {selected}</h3>
        <div className="cards-container">
          {portfolios.find(p => p.name === selected)?.activities.map((act, idx) => (
            <div
              key={idx}
              className="activity-card"
              onClick={() => handleActivityClick(act)}
            >
              {act}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
