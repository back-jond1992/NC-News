const {
  fetchAllArticles,
  fetchArticlesById,
  updateArticle,
  fetchAllComments,
  inputComment,
} = require("../models/articles.models");

exports.getAllArticles = (req, res, next) => {
  const sort_by = req.query.sort_by;
  const order = req.query.order;
  const topicQuery = req.query.topic;
  fetchAllArticles(sort_by, order, topicQuery)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  updateArticle(article_id, req.body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchAllComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  inputComment(article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
