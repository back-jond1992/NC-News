const db = require("../db");

exports.fetchAllUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    return rows;
  });
};
