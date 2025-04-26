const mongoose = require('mongoose')
const Schema = mongoose.Schema
const modelSchema = new Schema({
  modelName: {
    type: String,
    required: true
  },
  modelType: {
    type: String,
    required: true
  },
  metrics: {
    type: Array,
    required: true
  }

}, { timestamps: true})


module.exports = mongoose.model('Model', modelSchema)