const db = require("../db");

exports.fetchAllTopics = () => {
  console.log("hello");
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};
