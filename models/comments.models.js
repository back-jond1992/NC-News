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
