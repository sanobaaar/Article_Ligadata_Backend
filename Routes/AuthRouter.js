const { signup, login } = require("../Controllers/AuthController")
const { signupValidation, loginValidation } = require("../Middleware/Validation")

const router = require("express").Router()

//routes/paths to perform post operations on Users
router.post("/signup", signupValidation, signup)
router.post("/login", loginValidation, login)

module.exports = router
