const mongoose = require('mongoose');
const { Schema } = mongoose;

const rapportFraudeSchema = new Schema({
  utilisateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true,
  },
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluation',
    required: true,
  },
  soumissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Soumission',
    required: true,
  },
  typeFraude: {
    type: String,
    enum: ['Plagiat', 'Fraude académique', 'Autre'],
    required: true,
  },
  details: {
    type: String,
  },
  fichiersJoints: [{
    type: String,
  }],
}, { timestamps: true });

rapportFraudeSchema.methods.envoyerRapport = function(utilisateurEmail) {
  // Logique pour envoyer le rapport
};

const RapportFraude = mongoose.model('RapportFraude', rapportFraudeSchema);

module.exports = RapportFraude;
