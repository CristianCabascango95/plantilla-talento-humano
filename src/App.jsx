import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Actividades from "./pages/Actividades";
import Repositorio from "./pages/Repositorio"; // <-- nuevo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/repositorio" element={<Repositorio />} /> {/* nuevo */}
      </Routes>
    </Router>
  );
}

export default App;
