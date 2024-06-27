const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const questionRoutes = require('./routes/questionRoutes');
const reponseRoutes = require('./routes/reponseRoutes');
const soumissionRoutes = require('./routes/soumissionRoutes');
const rapportFraudeRoutes = require('./routes/rapportFraudeRoutes');
const ListeRoutes = require('./routes/listeRoutes');
const NoteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reponses', reponseRoutes);
app.use('/api/soumissions', soumissionRoutes);
app.use('/api/rapportsFraude', rapportFraudeRoutes);
app.use('/api/listes', ListeRoutes);
app.use('/api/notes', NoteRoutes);

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://root:Lewis0767567930@restapituto.ylqfjyi.mongodb.net/';

mongoose.connect(`${mongoUri}live_session`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(chalk.bgGreen.black('Connected to MongoDB'));
}).catch(err => {
  console.error(chalk.bgRed.white('Error connecting to MongoDB:', err.message));
});

// Middleware to log requests and color code errors
app.use((req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      console.error(chalk.bgRed.white(`Error ${res.statusCode}: ${req.method} ${req.originalUrl}`));
    } else {
      console.log(chalk.bgOrange.white(`${req.method} ${req.originalUrl} ${res.statusCode}`));
    }
  });
  next();
});

// General error handler
app.use((err, req, res, next) => {
  console.error(chalk.bgRed.white(err.stack));
  res.status(500).send('Something broke!');
});

module.exports = app;
