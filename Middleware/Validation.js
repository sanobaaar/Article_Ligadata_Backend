const Joi = require("joi")

//Joi library to validate schema fields
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: "Bad request", error })
  }
  next()
}

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: "Bad request", error })
  }
  next()
}

const postArticleValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    content: Joi.string().min(5).max(1000).required(),
    date: Joi.date().iso({ format: "YYYY-MM-DD", strict: true }),
    image: Joi.any(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: "Bad request", error })
  }
  next()
}

const editArticleValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50),
    content: Joi.string().min(5).max(1000),
    date: Joi.date().iso({ format: "YYYY-MM-DD", strict: true }),
    image: Joi.any(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    ß
    return res.status(400).json({ message: "Bad request", error })
  }
  next()
}

module.exports = { signupValidation, loginValidation, postArticleValidation, editArticleValidation }
