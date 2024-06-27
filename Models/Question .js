const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  type: {
    type: String,
    enum: ['QCM', 'Texte'],
    required: true,
  },
  texte: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  options: [{
    type: String,
  }],
  reponse: {
    type: String,
  },
  keywords: [{
    mot: String,
    poids: Number,
  }],
    evaluation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluation',
        required: true,
    },
});

questionSchema.methods.ajouterOption = function(option) {
  this.options.push(option);
  return this.save();
};

questionSchema.methods.supprimerOption = function(option) {
  this.options = this.options.filter(opt => opt !== option);
  return this.save();
};

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
