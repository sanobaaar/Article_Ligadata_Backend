const ensureAuth = require("../Middleware/Auth")

const { postArticle, getArticles, updateArticle, deleteArticle } = require("../Controllers/ArticlesController")
const { postArticleValidation, editArticleValidation } = require("../Middleware/Validation")

const router = require("express").Router()


//routes/paths to perform CRUD operations on Articles
router.get("/", ensureAuth, getArticles)
router.post("/new", ensureAuth, postArticleValidation, postArticle)
router.put("/update/:id", ensureAuth, editArticleValidation, updateArticle)
router.delete("/delete/:id", ensureAuth, deleteArticle)

module.exports = router
