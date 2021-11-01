const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticlesById,
} = require("../controllers/articles.controllers");

articleRouter.get("/", getAllArticles);
articleRouter.get("/:article_id", getArticlesById);

module.exports = articleRouter;
