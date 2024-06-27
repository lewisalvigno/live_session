const mongoose = require('mongoose');
const { Schema } = mongoose;

const reponseSchema = new Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  texteReponse: {
    type: String,
    required: true,
  },
  note: {
    type: Number,
  },
});

reponseSchema.methods.ajouterTexteReponse = function(texte) {
  this.texteReponse = texte;
  return this.save();
};

reponseSchema.methods.modifierTexteReponse = function(texte) {
  this.texteReponse = texte;
  return this.save();
};

reponseSchema.methods.attribuerNote = function(note) {
  this.note = note;
  return this.save();
};

const Reponse = mongoose.model('Reponse', reponseSchema);

module.exports = Reponse;
