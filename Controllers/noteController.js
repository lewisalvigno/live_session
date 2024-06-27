const Note = require('../models/Note');

// Créer une note
exports.createNote = async (req, res) => {
  try {
    const { utilisateurId, evaluationId, score, coefficient } = req.body;
    const note = new Note({
      utilisateurId,
      evaluationId,
      score,
      coefficient,
    });
    await note.calculerNotePonderee();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les notes pour une évaluation
exports.getNotesByEvaluation = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    const notes = await Note.find({ evaluationId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une note par ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note non trouvée' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, coefficient } = req.body;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note non trouvée' });
    }
    note.score = score;
    note.coefficient = coefficient;
    await note.calculerNotePonderee();
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ error: 'Note non trouvée' });
    }
    res.status(200).json({ message: 'Note supprimée avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Trier les notes par mérite pour une évaluation
exports.trierParMerite = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    const notes = await Note.trierParMerite(evaluationId);
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Télécharger les notes en CSV pour une évaluation
exports.telechargerEnCSV = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    const csv = await Note.telechargerEnCSV(evaluationId);
    res.header('Content-Type', 'text/csv');
    res.attachment(`notes_${evaluationId}.csv`);
    res.send(csv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
