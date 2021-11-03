const fetchArticlesByIdQuery = `
SELECT
articles.author,
articles.title,
articles.article_id,
articles.body,
articles.topic,
articles.created_at,
articles.votes,
COUNT(comments.comment_id)::INTEGER AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
WHERE articles.article_id = $1
GROUP BY articles.article_id`;

const fetchAllArticlesQuery = `SELECT
articles.author,
articles.title,
articles.article_id,
articles.body,
articles.topic,
articles.created_at,
articles.votes,
COUNT(comments.comment_id)::INTEGER AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
`;

module.exports = { fetchArticlesByIdQuery, fetchAllArticlesQuery };
