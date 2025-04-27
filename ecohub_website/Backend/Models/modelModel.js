const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  },
  modelCategory: {
    type: String,
    required: true
  },
  datasetInfo: {
    type: [Number], // Array of numbers
    required: true
  },
  efficiencyInfo: {
    type: [Number], // Array of numbers
    required: true
  },
  ecometrics: {
    type: [Number], // Array of numbers
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Model', modelSchema);
