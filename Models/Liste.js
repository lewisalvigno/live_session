const mongoose = require('mongoose');
const { Schema } = mongoose;

const listeSchema = new Schema({
  idList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
  }],
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const Liste = mongoose.model('Liste', listeSchema);

module.exports = Liste;
