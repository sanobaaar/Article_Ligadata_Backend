const ArticlesModel = require("../Models/Articles")

//Create article
const postArticle = async (req, res) => {
  try {
    const { title, content, date, image } = req.body
    const heading = await ArticlesModel.findOne({ title })
    if (heading) {
      res.status(409)
      res.send({ message: "Title already exists, use another name!", success: false })
      return
    }
    const articleModel = new ArticlesModel({ title, content, date, image })
    await articleModel.save()
    res.status(201)
    res.send({ message: "Article added successfully", success: true })
    return
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal server error", success: false })
    return
  }
}

//Get Articles
const getArticles = async (req, res) => {
  try {
    const articles = await ArticlesModel.find()
    if (articles.length === 0) {
      res.status(403)
      res.send({ message: "No articles found!" })
      return
    }
    res.status(200)
    res.send(articles)
    return
  } catch (err) {
    res.status(403)
    res.send({ message: "Nothing found!", success: false })
    return
  }
}

//Update Article
const updateArticle = async (req, res) => {
  try {
    const id = req.params.id
    const articleExists = await ArticlesModel.findOne({ _id: id })
    if (!articleExists) {
      res.status(404)
      res.send({ message: "Article not found" })
      return
    }

    const updatedArticle = await ArticlesModel.findByIdAndUpdate(id, req.body, { new: true })
    res.status(201)
    res.send(updatedArticle)
    return
  } catch (error) {
    res.status(500)
    res.send({ message: "Internal server error", success: false })
    return
  }
}

//Delete Article
const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id
    const articleExists = await ArticlesModel.findOne({ _id: id })
    if (!articleExists) {
      res.status(404)
      res.send({ message: "Article not found" })
      return
    }

    const deletedArticle = await ArticlesModel.findByIdAndDelete(id)
    res.status(200)
    res.send({ message: "Article Deleted", success: true })
    return
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal server error", success: false })
    return
  }
}

module.exports = { postArticle, getArticles, updateArticle, deleteArticle }
