const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

require("dotenv").config
require("./Models/db")

const AuthRouter = require("./Routes/AuthRouter")
const ArticlesRouter = require("./Routes/ArticlesRouter")

const port = process.env.PORT || 8080

//test the server
app.get("/ping", (req, res) => {
  res.send("PONG")
})

//use to translate res from API's
app.use(bodyParser.json())

//use to pass info b/w frontend and backend
app.use(cors())

app.use("/auth", AuthRouter)
app.use("/articles", ArticlesRouter)

//connect with port
app.listen(port, err => {
  if (err) {
    return console.log(err)
  }
  return console.log(`listening to port: ${port}`)
})
