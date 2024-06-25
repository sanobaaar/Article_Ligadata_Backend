const UserModel = require("../Models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
      return res.status(409).json({ message: "User already exists, please log in!", success: false })
    }
    const userModel = new UserModel({ firstName, lastName, email, password })
    userModel.password = await bcrypt.hash(password, 10)
    await userModel.save()
    res.status(201).json({ message: "Signup successful", success: true })
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false })
  }
}

//LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const errorMessage = "Authentication failed, email or password wrong"
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(403).json({ message: errorMessage, success: false })
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMessage, success: false })
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, "secret-123", { expiresIn: "24h" })

    res.status(200).json({ message: "Login successful", success: true, jwtToken, email, name: user.firstName })
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false })
  }
}

module.exports = { signup, login }
