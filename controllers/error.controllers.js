exports.handlesPSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid request" });
  } else if (err.code === "23502") {
    res.status(400).send({ message: "Must contain body" });
  } else {
    next(err);
  }
};

exports.handlesCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

exports.handles500Errors = (err, req, res, next) => {
  res.status(500).send({ message: "Internal Server Error" });
};
