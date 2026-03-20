const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  originalQuestion: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    enum: ['text', 'voice', 'image'],
    required: true
  },
  answer: String,
  explanation: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);
