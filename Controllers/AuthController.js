const UserModel = require("../Models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { hashPassword } = require("../Middleware/hashPassword")
const { comparePassword } = require("../Middleware/comparePassword")

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
      res.status(409)
      res.send({ message: "User already exists, please log in!", success: false })
    }
    const userModel = new UserModel({ firstName, lastName, email, password })

    //hashes the password to be encrypted
    userModel.password = await hashPassword(password)
    await userModel.save()
    res.status(201)
    res.send({ message: "Signup successful", success: true })
    return
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal server error", success: false })
    return
  }
}

//LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const errorMessage = "Authentication failed, email or password wrong"
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(403)
      res.send({ message: errorMessage, success: false })
      return
    }

    //compares pw from user and pw in db to give authentication access
    const isPasswordEqual = await comparePassword(password, user.password)
    if (!isPasswordEqual) {
      res.status(403)
      res.send({ message: errorMessage, success: false })
      return
    }

    //creates a token with the help of secret key
    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, "secret-123", { expiresIn: "24h" })

    res.status(200)
    res.send({ message: "Login successful", success: true, jwtToken, email, name: user.firstName })
    return
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal server error", success: false })
    return
  }
}

module.exports = { signup, login }
