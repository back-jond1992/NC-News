const format = require("pg-format");
const db = require("../../db");

const seed = ({ articleData, commentData, topicData, userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE topics (
      slug VARCHAR (50) UNIQUE PRIMARY KEY NOT NULL,
      description VARCHAR NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        username VARCHAR (50) UNIQUE PRIMARY KEY,
        avatar_url VARCHAR,
        name VARCHAR
      );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      body VARCHAR NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username) NOT NULL,
      created_at TIMESTAMP DEFAULT current_timestamp
    );`);
    })
    .then(() => {
      return db.query(`
  CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR REFERENCES users(username) NOT NULL,
    article_id INT REFERENCES articles(article_id) NOT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT current_timestamp,
    body VARCHAR NOT NULL
  );`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO topics (
          slug,
          description
        )
        VALUES %L RETURNING *;`,
        topicData.map((item) => [item.slug, item.description])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users (
          username,
          avatar_url,
          name
        )
        VALUES %L RETURNING *;`,
        userData.map((item) => [item.username, item.avatar_url, item.name])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO articles (
          title,
          body,
          votes,
          topic,
          author,
          created_at
        )
        VALUES %L RETURNING *;`,
        articleData.map((item) => [item.title, item.body, item.votes, item.topic, item.author, item.created_at])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO comments (
        author,
        article_id,
        votes,
        created_at,
        body
      ) 
      VALUES %L RETURNING *;`,
        commentData.map((item) => [item.author, item.article_id, item.votes, item.created_at, item.body])
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
