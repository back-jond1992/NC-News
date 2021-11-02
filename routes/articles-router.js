const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticlesById,
  patchArticle,
} = require("../controllers/articles.controllers");

articleRouter.get("/", getAllArticles);
articleRouter.get("/:article_id", getArticlesById);
articleRouter.patch("/:article_id", patchArticle);

module.exports = articleRouter;
