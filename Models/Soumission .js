const mongoose = require('mongoose');
const { Schema } = mongoose;

const soumissionSchema = new Schema({
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
  reponses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reponse',
  }],
  etatPlagiat: {
    type: String,
  },
  fichiers: [{
    type: String,
  }],
  noteFinale: {
    type: Number,
  },
}, { timestamps: true });

soumissionSchema.methods.ajouterReponse = function(reponse) {
  this.reponses.push(reponse);
  return this.save();
};

soumissionSchema.methods.modifierReponse = function(reponseId, nouvelleReponse) {
  const index = this.reponses.findIndex(r => r._id.toString() === reponseId);
  if (index !== -1) {
    this.reponses[index] = nouvelleReponse;
    return this.save();
  }
  return Promise.reject(new Error('Réponse non trouvée'));
};

soumissionSchema.methods.supprimerReponse = function(reponseId) {
  this.reponses = this.reponses.filter(r => r._id.toString() !== reponseId);
  return this.save();
};

soumissionSchema.methods.telechargerFichiers = function() {
  // Logique pour le téléchargement des fichiers
};

const Soumission = mongoose.model('Soumission', soumissionSchema);

module.exports = Soumission;
