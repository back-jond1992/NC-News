const db = require("../db");

exports.fetchAllArticles = () => {
  return db.query(`SELECT * FROM articles;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      } else {
        return rows[0];
      }
    });
};

exports.updateArticle = (article_id, updates) => {
  const { inc_votes } = updates;
  console.log(inc_votes);
  if (!inc_votes) {
    return Promise.reject({ status: 400, message: "Input can not be empty" });
  } else {
    return db
      .query(
        "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING  *;",
        [inc_votes, article_id]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
};
