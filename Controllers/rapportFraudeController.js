const RapportFraude = require('../Models/RapportFraude');

// Créer un rapport de fraude
exports.createRapportFraude = async (req, res) => {
  try {
    const { utilisateurId, evaluationId, soumissionId, typeFraude, details, fichiersJoints } = req.body;
    const rapportFraude = new RapportFraude({ utilisateurId, evaluationId, soumissionId, typeFraude, details, fichiersJoints });
    await rapportFraude.save();
    res.status(201).json(rapportFraude);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les rapports de fraude
exports.getAllRapportsFraude = async (req, res) => {
  try {
    const rapportsFraude = await RapportFraude.find();
    res.status(200).json(rapportsFraude);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer un rapport de fraude par ID
exports.getRapportFraudeById = async (req, res) => {
  try {
    const { id } = req.params;
    const rapportFraude = await RapportFraude.findById(id);
    if (!rapportFraude) {
      return res.status(404).json({ error: 'Rapport de fraude non trouvé' });
    }
    res.status(200).json(rapportFraude);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un rapport de fraude
exports.updateRapportFraude = async (req, res) => {
  try {
    const { id } = req.params;
    const { typeFraude, details, fichiersJoints } = req.body;
    const rapportFraude = await RapportFraude.findByIdAndUpdate(id, { typeFraude, details, fichiersJoints }, { new: true });
    if (!rapportFraude) {
      return res.status(404).json({ error: 'Rapport de fraude non trouvé' });
    }
    res.status(200).json(rapportFraude);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un rapport de fraude
exports.deleteRapportFraude = async (req, res) => {
  try {
    const { id } = req.params;
    const rapportFraude = await RapportFraude.findByIdAndDelete(id);
    if (!rapportFraude) {
      return res.status(404).json({ error: 'Rapport de fraude non trouvé' });
    }
    res.status(200).json({ message: 'Rapport de fraude supprimé avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
