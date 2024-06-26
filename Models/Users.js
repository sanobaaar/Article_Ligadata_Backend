const mongoose = require("mongoose")

const Schema = mongoose.Schema

//User info table

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel
