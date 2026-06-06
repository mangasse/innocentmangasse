const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const pollRoutes = require('./routes/pollRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/polls', pollRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion MongoDB :', err);
  });