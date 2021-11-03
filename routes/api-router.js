const apiRouter = require("express").Router();
const topicRouter = require("./topics-router");
const articleRouter = require("./articles-router");
//const commentRouter = require("./comments-router");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ message: "All OK from API Router" });
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);

//apiRouter.use("/articles/:article_id", commentRouter);

module.exports = apiRouter;
