const {
  fetchAllArticles,
  fetchArticlesById,
  updateArticle,
} = require("../models/articles.models");

exports.getAllArticles = (req, res, next) => {
  const sort_by = req.query.sort_by;
  const order = req.query.order;
  const topicQuery = req.query.topic;
  console.log(topicQuery);
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
