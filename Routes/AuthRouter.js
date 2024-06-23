const { signup, login } = require("../Controllers/AuthController")
const { signupValidation, loginValidation } = require("../Middleware/Validation")

const router = require("express").Router()

router.post("/signup", signupValidation, signup)
router.post("/login", loginValidation, login)

module.exports = router
