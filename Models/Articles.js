const mongoose = require("mongoose")

const Schema = mongoose.Schema

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
    required: true,
  },
})

const ArticlesModel = mongoose.model("articles", ArticlesSchema)
module.exports = ArticlesModel