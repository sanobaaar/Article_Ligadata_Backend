const ArticlesModel = require("../Models/Articles")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Create new article
const postArticle = async (req, res) => {
  try {
    const { title, content, date } = req.body
    const heading = await ArticlesModel.findOne({ title })
    if (heading) {
      return res.status(409).json({ message: "Title already exists, use another name!", success: false })
    }
    const articleModel = new ArticlesModel({ title, content, date })
    await articleModel.save()
    res.status(201).json({ message: "Article added successfully", success: true })
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false })
  }
}

//Get Articles
const getArticles = async (req, res) => {
  try {
    const articles = await ArticlesModel.find()
    if (articles.length === 0) {
      res.status(404).json({ message: "No articles found!" })
    }
    res.status(200).json(articles)
  } catch (err) {
    return res.status(403).json({ message: "Nothing found!", success: false })
  }
}

//Update Article
const updateArticle = async (req, res) => {
  try {
    const id = req.params.id
    const articleExists = await ArticlesModel.findOne({ _id: id })
    if (!articleExists) {
      return res.status(404).json({ message: "Article not found" })
    }

    const updatedArticle = await ArticlesModel.findByIdAndUpdate(id, req.body, { new: true })
    res.status(201).json(updatedArticle)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false })
  }
}

//Delete Article
const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id
    const articleExists = await ArticlesModel.findOne({ _id: id })
    if (!articleExists) {
      return res.status(404).json({ message: "Article not found" })
    }

    const deleteArticle = await ArticlesModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Article Deleted", success: true })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", success: false })
  }
}

module.exports = { postArticle, getArticles, updateArticle, deleteArticle }
