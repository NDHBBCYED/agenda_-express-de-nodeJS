const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint para obtener la lista de contactos
app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    const contactos = response.data;
    res.json(contactos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de contactos' });
  }
});

// Endpoint para almacenar un nuevo contacto
app.post('/contactos', async (req, res) => {
  const nuevoContacto = req.body;

  try {
    // Aquí podrías realizar la lógica necesaria para almacenar el contacto en tu sistema
    // Por ejemplo, podrías guardarlos en una base de datos.

    res.json({ mensaje: 'Contacto almacenado correctamente', contacto: nuevoContacto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al almacenar el contacto' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
