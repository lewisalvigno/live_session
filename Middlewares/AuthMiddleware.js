// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur');
const { handleError } = require('../utils/errorHandler');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const utilisateur = await Utilisateur.findById(decoded.id);
    if (!utilisateur) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
    req.utilisateur = utilisateur;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = authMiddleware;
