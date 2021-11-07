const db = require("../db");

exports.removeComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comment_id,
    ])
    .then(({ rows }) => {
      const deleted = rows[0];
      if (!deleted) {
        return Promise.reject({
          status: 404,
          message: "Not found",
        });
      }
    });
};

exports.updateComment = (comment_id, updates) => {
  const { inc_votes } = updates;
  return db
    .query(
      "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
      [inc_votes, comment_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
