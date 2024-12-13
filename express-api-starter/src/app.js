const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const users = [
  {id: "1", nombre: "Bruno", apellido: "Fandino", tlf: "987654321"},
  {id: "2", nombre: "Juan", apellido: "Gutierrez", tlf: "983544321"},
  {id: "3", nombre: "Carla", apellido: "Alvarez", tlf: "987645321"},
  {id: "4", nombre: "Julia", apellido: "Dinero", tlf: "967854321"},
  {id: "5", nombre: "Ramon", apellido: "Ramirez", tlf: "987024321"}
]

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  res.json(users[req.params.id - 1]);
});

app.post("/users", (req, res) => {
  const { nombre, apellido, tlf } = req.body;

  // Validar datos de entrada
  if (!nombre || !apellido || !tlf) {
    return res.status(400).json({ message: "Todos los campos son requeridos: nombre, apellido, tlf" });
  }

  // Generar un nuevo ID basado en el más alto
  const newId = (Math.max(...users.map(u => parseInt(u.id))) + 1).toString();

  // Crear el nuevo usuario
  const newUser = { id: newId, nombre, apellido, tlf };
  users.push(newUser);

  res.status(201).json(newUser);
});


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
