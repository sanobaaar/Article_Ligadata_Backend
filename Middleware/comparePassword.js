const bcrypt = require("bcrypt")

function comparePassword(raw, hash) {
  return bcrypt.compareSync(raw, hash)
}

module.exports = { comparePassword }
