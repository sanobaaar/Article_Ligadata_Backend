const mongoose = require("mongoose")
require("dotenv").config

const mongo_url =
  "mongodb+srv://maryamfatima96mf:504602370@cluster0.atpacki.mongodb.net/articles?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected")
  })
  .catch(err => {
    console.log("MongoDB connection error", err)
  })
