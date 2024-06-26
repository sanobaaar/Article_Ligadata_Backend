const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Structure of the Articles Object
const ArticlesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
  },
})

const ArticlesModel = mongoose.model("articles", ArticlesSchema)
module.exports = ArticlesModel
