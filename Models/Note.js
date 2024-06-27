const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
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
  score: {
    type: Number,
    required: true,
  },
  coefficient: {
    type: Number,
    required: true,
  },
  notePonderee: {
    type: Number,
  },
}, { timestamps: true });

noteSchema.methods.calculerNotePonderee = function() {
  this.notePonderee = this.score * this.coefficient;
  return this.save();
};

noteSchema.statics.trierParMerite = function(evaluationId) {
  return this.find({ evaluationId }).sort({ notePonderee: -1 });
};

noteSchema.statics.telechargerEnCSV = async function(evaluationId) {
  const notes = await this.find({ evaluationId });
  const csv = notes.map(note => `${note.utilisateurId},${note.score},${note.coefficient},${note.notePonderee}`).join('\n');
  return csv;
};

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
