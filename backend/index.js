const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Usuarios simulados
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' },
];

// Actividades simuladas
let actividades = [
  { id: 1, descripcion: 'Revisión de informes', fecha: '2024-11-18' },
  { id: 2, descripcion: 'Capacitación interna', fecha: '2024-11-20' },
];

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ token: 'fakeToken12345' });
  } else {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// CRUD de actividades
app.get('/api/actividades', (req, res) => res.json(actividades));

app.post('/api/actividades', (req, res) => {
  const { descripcion, fecha } = req.body;
  if (!descripcion || !fecha) return res.status(400).json({ error: 'Faltan campos obligatorios' });
  const nuevaActividad = { id: Date.now(), descripcion, fecha };
  actividades.push(nuevaActividad);
  res.status(201).json(nuevaActividad);
});

app.delete('/api/actividades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = actividades.findIndex(act => act.id === id);
  if (index === -1) return res.status(404).json({ error: 'Actividad no encontrada' });
  actividades.splice(index, 1);
  res.json({ mensaje: 'Actividad eliminada correctamente' });
});

// ✅ Ruta para leer el Excel
app.get('/api/talento-humano', (req, res) => {
  try {
    const workbook = xlsx.readFile(path.join(__dirname, 'PLANTILLA TICS 18_11_2024.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });
    res.json(data);
  } catch (error) {
    console.error('Error leyendo el archivo Excel:', error);
    res.status(500).json({ error: 'Error al leer el archivo Excel' });
  }
});

// ✅ Rutas para manejar el repositorio de PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const original = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}_${original}`);
  }
});
const upload = multer({ storage });

app.get('/api/repositorio', (req, res) => {
  const folder = './uploads';
  if (!fs.existsSync(folder)) return res.json([]);

  const files = fs.readdirSync(folder).map(filename => {
    const stats = fs.statSync(path.join(folder, filename));
    return {
      name: filename,
      url: `http://localhost:${port}/uploads/${filename}`,
      date: stats.birthtime,
    };
  });
  res.json(files);
});

app.post('/api/repositorio', upload.single('archivo'), (req, res) => {
  res.status(201).json({ mensaje: 'Archivo subido correctamente' });
});

app.delete('/api/repositorio/:filename', (req, res) => {
  const filePath = path.join('./uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.json({ mensaje: 'Archivo eliminado' });
  }
  res.status(404).json({ error: 'Archivo no encontrado' });
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
