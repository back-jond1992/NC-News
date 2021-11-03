const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticlesById,
  patchArticle,
  getAllComments,
} = require("../controllers/articles.controllers");

articleRouter.get("/", getAllArticles);
articleRouter.get("/:article_id", getArticlesById);
articleRouter.patch("/:article_id", patchArticle);

articleRouter.get("/:article_id/comments", getAllComments);

module.exports = articleRouter;
