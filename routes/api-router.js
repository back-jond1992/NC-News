const apiRouter = require("express").Router();
const topicRouter = require("./topics-router");
const articleRouter = require("./articles-router");
const commentRouter = require("./comments-router");
const userRouter = require("./users-router");
const { getAPI } = require("../controllers/api.controllers");

apiRouter.get("/", getAPI);

apiRouter.use("/topics", topicRouter);

apiRouter.use("/articles", articleRouter);

apiRouter.use("/comments", commentRouter);

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
