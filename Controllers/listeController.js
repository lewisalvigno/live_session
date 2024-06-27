const Liste = require('../models/Liste');

// Créer une liste de participants
exports.createListe = async (req, res) => {
  try {
    const { idList } = req.body;
    const liste = new Liste({ idList });
    await liste.save();
    res.status(201).json(liste);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les listes de participants
exports.getAllListes = async (req, res) => {
  try {
    const listes = await Liste.find();
    res.status(200).json(listes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une liste de participants par ID
exports.getListeById = async (req, res) => {
  try {
    const { id } = req.params;
    const liste = await Liste.findById(id);
    if (!liste) {
      return res.status(404).json({ error: 'Liste de participants non trouvée' });
    }
    res.status(200).json(liste);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une liste de participants
exports.updateListe = async (req, res) => {
  try {
    const { id } = req.params;
    const { idList } = req.body;
    const liste = await Liste.findByIdAndUpdate(id, { idList }, { new: true });
    if (!liste) {
      return res.status(404).json({ error: 'Liste de participants non trouvée' });
    }
    res.status(200).json(liste);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une liste de participants
exports.deleteListe = async (req, res) => {
  try {
    const { id } = req.params;
    const liste = await Liste.findByIdAndDelete(id);
    if (!liste) {
      return res.status(404).json({ error: 'Liste de participants non trouvée' });
    }
    res.status(200).json({ message: 'Liste de participants supprimée avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
