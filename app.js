const cors = require("cors");
const express = require("express");
const { handles500Errors, handlesPSQLErrors, handlesCustomErrors } = require("./controllers/error.controllers");

const apiRouter = require("./routes/api-router");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

app.all("*", (req, res, next) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(handlesPSQLErrors);

app.use(handlesCustomErrors);

app.use(handles500Errors);

module.exports = app;
