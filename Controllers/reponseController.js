const Reponse = require('../models/reponse');

// Créer une nouvelle réponse
exports.createReponse = async (req, res) => {
  try {
    const { questionId, texteReponse } = req.body;
    const reponse = new Reponse({ questionId, texteReponse });
    await reponse.save();
    res.status(201).json(reponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les réponses pour une question donnée
exports.getReponsesByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const reponses = await Reponse.find({ questionId });
    res.status(200).json(reponses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une réponse par ID
exports.getReponseById = async (req, res) => {
  try {
    const { id } = req.params;
    const reponse = await Reponse.findById(id);
    if (!reponse) {
      return res.status(404).json({ error: 'Réponse non trouvée' });
    }
    res.status(200).json(reponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une réponse
exports.updateReponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { texteReponse } = req.body;
    const reponse = await Reponse.findByIdAndUpdate(id, { texteReponse }, { new: true });
    if (!reponse) {
      return res.status(404).json({ error: 'Réponse non trouvée' });
    }
    res.status(200).json(reponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une réponse
exports.deleteReponse = async (req, res) => {
  try {
    const { id } = req.params;
    const reponse = await Reponse.findByIdAndDelete(id);
    if (!reponse) {
      return res.status(404).json({ error: 'Réponse non trouvée' });
    }
    res.status(200).json({ message: 'Réponse supprimée avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
