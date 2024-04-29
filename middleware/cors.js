// middlewares/cors.js
const Cors = require('cors');


// Configura CORS para permitir solicitudes desde tu aplicación frontend
const cors = Cors({
  origin: 'http://localhost:3000', // Reemplaza con el origen de tu aplicación frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

module.exports = cors;
