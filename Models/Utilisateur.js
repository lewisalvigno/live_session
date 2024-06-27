const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nomComplet: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ['evaluateur', 'participant'], required: true },
  googleDriveLinked: { type: Boolean, default: false },
  liste : { type: mongoose.Schema.Types.ObjectId, ref: 'Liste', default: null},
  googleDriveRepo: { type: String }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

utilisateurSchema.virtual('evaluations', {
  ref: 'Evaluation',
  localField: '_id',
  foreignField: 'evaluateur'
});

utilisateurSchema.virtual('soumissions', {
  ref: 'Soumission',
  localField: '_id',
  foreignField: 'participant'
});

utilisateurSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.motDePasse; // Never return the password hash
  },
  virtuals: true
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;
