const jwt = require("jsonwebtoken")


//ensure authorization is passed to the user
const ensureAuth = (req, res, next) => {
  const auth = req.headers["authorization"]
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized,jwt token is required" })
  }
  try {
    const decoded = jwt.verify(auth, "secret-123")
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized,jwt token is wrong or expired" })
  }
}

module.exports = ensureAuth
