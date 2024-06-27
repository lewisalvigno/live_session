// routes/utilisateurRoutes.js
const express = require('express');
const {
  registerUtilisateur,
  loginUtilisateur,
  getUtilisateurProfile,
  updateUtilisateurProfile,
  deleteUtilisateurProfile
} = require('../controllers/utilisateurController');
const authMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/register', registerUtilisateur);
router.post('/login', loginUtilisateur);
router.get('/profile', authMiddleware, getUtilisateurProfile);
router.put('/profile', authMiddleware, updateUtilisateurProfile);
router.delete('/profile', authMiddleware, deleteUtilisateurProfile);

module.exports = router;
