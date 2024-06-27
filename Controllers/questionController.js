const Question = require('../Models/Question ');

// Créer une nouvelle question
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les questions pour une évaluation donnée
exports.getQuestionsByEvaluation = async (req, res) => {
  try {
    const questions = await Question.find({ evaluation: req.params.evaluationId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une question par ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }
    res.status(200).json({ message: 'Question supprimée avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
