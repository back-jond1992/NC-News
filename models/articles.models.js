const db = require("../db");

exports.fetchAllArticles = () => {
  return db.query(`SELECT * FROM articles;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticlesById = (article_id) => {
  console.log(article_id);
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      return rows[0];
    });
};
