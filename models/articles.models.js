const db = require("../db");
const { fetchArticlesByIdQuery, fetchAllArticlesQuery } = require("../queries");

exports.fetchAllArticles = (sort_by = "created_at", order = "DESC", topicQuery) => {
  if (
    sort_by !== "author" &&
    sort_by !== "title" &&
    sort_by !== "treasure_name" &&
    sort_by !== "article_id" &&
    sort_by !== "topic" &&
    sort_by !== "created_at" &&
    sort_by !== "votes" &&
    sort_by !== "comment_count"
  ) {
    return Promise.reject({ status: 400, message: "Bad query" });
  }

  if (order !== "ASC" && order !== "DESC") {
    return Promise.reject({ status: 400, message: "Bad query" });
  }

  let queryStr = fetchAllArticlesQuery;

  const sanitiser = [];

  if (topicQuery) {
    sanitiser.push(topicQuery);
    queryStr += ` WHERE topic = $1`;
  }

  queryStr += ` GROUP BY articles.article_id`;

  queryStr += ` ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, sanitiser).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "Not found" });
    }
    return rows;
  });
};

exports.fetchArticlesById = (article_id) => {
  return db.query(fetchArticlesByIdQuery, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "Not found" });
    } else {
      return rows[0];
    }
  });
};

exports.updateArticle = (article_id, updates) => {
  if (!/inc_votes/.test(Object.keys(updates))) {
    return Promise.reject({ status: 400, message: "Invalid request" });
  } else if (Object.keys(updates).length > 1) {
    return Promise.reject({ status: 400, message: "Invalid request" });
  } else if (Object.keys(updates) < 1) {
    return Promise.reject({ status: 400, message: "Invalid request" });
  } else {
    const { inc_votes } = updates;
    return db
      .query("UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;", [inc_votes, article_id])
      .then(({ rows }) => {
        if (!rows[0]) {
          return Promise.reject({ status: 404, message: "Not found" });
        } else {
          return rows[0];
        }
      });
  }
};

exports.fetchAllComments = (article_id) => {
  return db.query("SELECT * FROM comments WHERE article_id = $1;", [article_id]).then(({ rows }) => {
    if (!rows[0]) {
      return Promise.reject({ status: 404, message: "Not found" });
    } else {
      return rows;
    }
  });
};

exports.inputComment = (article_id, newComment) => {
  if (Object.keys(newComment).length > 2) {
    return Promise.reject({ status: 400, message: "Invalid request" });
  } else if (Object.keys(newComment).length < 2) {
    return Promise.reject({ status: 400, message: "Invalid request" });
  } else {
    const { username, body } = newComment;
    return db
      .query("SELECT * FROM users WHERE username = $1;", [username])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, message: "Username not found" });
        }
      })
      .then(() => {
        return db
          .query("INSERT INTO comments (article_id, author, body) VALUES($1, $2, $3) RETURNING *;", [
            article_id,
            username,
            body,
          ])
          .then(({ rows }) => {
            return rows[0];
          });
      });
  }
};
