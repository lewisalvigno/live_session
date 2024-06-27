const mongoose = require('mongoose');
const { Schema } = mongoose;



const evaluationSchema = new Schema({
    type: {
      type: String,
      enum: ['Examen', 'Evaluation'],
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dateLimite: {
      type: Date,
    },
    nombreParticipants: {
      type: Number,
      default: 0,
    },
    lienInvitation: [{
      type: String,
    }],
    pointMax: {
      type: Number,
      required: true,
    },
    typeQuestions: {
        type: String,
        enum: ['enLigne', 'telechargementFichier'],
        required: true,
      },
      typeSoumission: {
        type: String,
        enum: ['enLigne', 'telechargementFichier'],
        required: true,
      },
    coefficient: {
      type: Number,
      default: 1,
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
    evaluateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur',
      required: true,
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur',
    }],
    detectionFraude: {
      type: Boolean,
      default: false,
    },
    verificationIdentite: {
      type: Boolean,
      default: false,
    }
  });

  evaluationSchema.methods.ajouterQuestion = function(question) {
    this.questions.push(question);
    return this.save();
  };
  
  evaluationSchema.methods.modifierQuestion = function(questionId, nouvelleQuestion) {
    const index = this.questions.findIndex(q => q._id.toString() === questionId);
    if (index !== -1) {
      this.questions[index] = nouvelleQuestion;
      return this.save();
    }
    return Promise.reject(new Error('Question non trouvée'));
  };
  
  evaluationSchema.methods.supprimerQuestion = function(questionId) {
    this.questions = this.questions.filter(q => q._id.toString() !== questionId);
    return this.save();
  };
  
  evaluationSchema.methods.genererLiens = function(nombreParticipants) {
    const liens = [];
    for (let i = 0; i < nombreParticipants; i++) {
      liens.push(`https://example.com/evaluation/${this._id}/participant/${i}`);
    }
    this.lienInvitation = liens;
    return this.save();
  };
  
  const Evaluation = mongoose.model('Evaluation', evaluationSchema);
  
  module.exports = Evaluation;
