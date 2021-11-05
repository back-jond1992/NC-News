const { fetchAPI } = require("../models/api.models");

exports.getAPI = (req, res, next) => {
  fetchAPI((err, api) => {
    console.log(api, "controller");
    res.status(200).send({ api });
  });
};
