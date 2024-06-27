// controllers/utilisateurController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur');
const { handleError } = require('../utils/errorHandler');

const registerUtilisateur = async (req, res) => {
  const { nomComplet, email, motDePasse, role } = req.body;
  try {
    const utilisateurExists = await Utilisateur.findOne({ email });
    if (utilisateurExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const utilisateur = new Utilisateur({ nomComplet, email, motDePasse: hashedPassword, role });
    await utilisateur.save();
    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (error) {
    handleError(res, error);
  }
};

const loginUtilisateur = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    handleError(res, error);
  }
};

const getUtilisateurProfile = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.utilisateur._id).select('-motDePasse');
    res.json(utilisateur);
  } catch (error) {
    handleError(res, error);
  }
};

const updateUtilisateurProfile = async (req, res) => {
  const { nomComplet, email } = req.body;
  try {
    const utilisateur = await Utilisateur.findById(req.utilisateur._id);
    if (nomComplet) utilisateur.nomComplet = nomComplet;
    if (email) utilisateur.email = email;
    await utilisateur.save();
    res.json(utilisateur);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteUtilisateurProfile = async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.utilisateur._id);
    res.json({ message: 'Utilisateur deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  registerUtilisateur,
  loginUtilisateur,
  getUtilisateurProfile,
  updateUtilisateurProfile,
  deleteUtilisateurProfile
};
