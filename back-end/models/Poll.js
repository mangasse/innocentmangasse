const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
})

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.length <= 5
      },
      message: 'Un sondage doit avoir entre 2 et 5 options'
    }
  },
  voters: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Poll', pollSchema)