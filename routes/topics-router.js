const topicRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics.controllers");

topicRouter.get("/", getAllTopics);

module.exports = topicRouter;
