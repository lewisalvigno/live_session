const Soumission = require('../Models/Soumission ');

// Créer une soumission
exports.createSoumission = async (req, res) => {
  try {
    const { utilisateurId, evaluationId, reponses, etatPlagiat, fichiers, noteFinale } = req.body;
    const soumission = new Soumission({ utilisateurId, evaluationId, reponses, etatPlagiat, fichiers, noteFinale });
    await soumission.save();
    res.status(201).json(soumission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les soumissions
exports.getAllSoumissions = async (req, res) => {
  try {
    const soumissions = await Soumission.find();
    res.status(200).json(soumissions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une soumission par ID
exports.getSoumissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const soumission = await Soumission.findById(id);
    if (!soumission) {
      return res.status(404).json({ error: 'Soumission non trouvée' });
    }
    res.status(200).json(soumission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une soumission
exports.updateSoumission = async (req, res) => {
  try {
    const { id } = req.params;
    const { reponses, etatPlagiat, fichiers, noteFinale } = req.body;
    const soumission = await Soumission.findByIdAndUpdate(id, { reponses, etatPlagiat, fichiers, noteFinale }, { new: true });
    if (!soumission) {
      return res.status(404).json({ error: 'Soumission non trouvée' });
    }
    res.status(200).json(soumission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une soumission
exports.deleteSoumission = async (req, res) => {
  try {
    const { id } = req.params;
    const soumission = await Soumission.findByIdAndDelete(id);
    if (!soumission) {
      return res.status(404).json({ error: 'Soumission non trouvée' });
    }
    res.status(200).json({ message: 'Soumission supprimée avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
