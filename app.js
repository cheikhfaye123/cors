const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los personajes' });
  }
});

app.get('/characters/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    
    if (response.data.results.length > 0) {
      res.json(response.data.results[0]);
    } else {
      res.status(404).json({ message: 'Personaje no encontrado' });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Personaje no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al buscar el personaje' });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});