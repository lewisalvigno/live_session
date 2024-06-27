const Evaluation = require('../Models/Evaluation ');

exports.createEvaluation = async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    res.status(201).send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).send(evaluations);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).send();
    }
    res.status(200).send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateEvaluation = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['type', 'titre', 'description', 'dateLimite', 'pointMax', 'typeQuestions', 'typeSoumission', 'coefficient', 'questions', 'evaluateur', 'participants', 'detectionFraude', 'verificationIdentite'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Mises à jour invalides!' });
  }

  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).send();
    }

    updates.forEach(update => evaluation[update] = req.body[update]);
    await evaluation.save();

    res.status(200).send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) {
      return res.status(404).send();
    }
    res.status(200).send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
};
