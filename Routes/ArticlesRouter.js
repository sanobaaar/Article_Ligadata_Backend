const ensureAuth = require("../Middleware/Auth")

const { postArticle, getArticles, updateArticle, deleteArticle } = require("../Controllers/ArticlesController")
const { postArticleValidation } = require("../Middleware/Validation")

const router = require("express").Router()

router.get("/", ensureAuth, getArticles)
router.post("/new", ensureAuth, postArticleValidation, postArticle)
router.put("/update/:id", ensureAuth, postArticleValidation, updateArticle)
router.delete("/delete/:id", ensureAuth, deleteArticle)

module.exports = router
