import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Asegúrate de importar el CSS


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas, por favor intente de nuevo.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Imagen arriba del título */}
        <img
          src="https://cotopaxi.gob.ec/test.cotopaxi.gob.ec/wp-content/uploads/2024/09/Captura-de-pantalla-2024-09-14-a-las-13.59.13.png"
          alt="Logo Cotopaxi"
          className="login-logo"
        />

        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
