const { fetchAPI } = require("../models/api.models");

exports.getAPI = (req, res, next) => {
  fetchAPI((err, api) => {
    res.status(200).send({ api });
  });
};
