const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticlesById,
  patchArticle,
  getAllComments,
  postComment,
} = require("../controllers/articles.controllers");

articleRouter.get("/", getAllArticles);
articleRouter.get("/:article_id", getArticlesById);
articleRouter.patch("/:article_id", patchArticle);

articleRouter.get("/:article_id/comments", getAllComments);
articleRouter.post("/:article_id/comments", postComment);

module.exports = articleRouter;
