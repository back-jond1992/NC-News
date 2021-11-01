const apiRouter = require("express").Router();
const topicRouter = require("./topics-router");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ message: "All OK from API Router" });
});

apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;
