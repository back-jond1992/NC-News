const db = require("../db");
const fs = require("fs");

exports.fetchAPI = (callback) => {
  return fs.readFile("endpoints.json", "utf-8", (err, endpoints) => {
    if (err) {
      next(err);
    } else {
      const parsedEndpoints = JSON.parse(endpoints);
      callback(null, parsedEndpoints);
    }
  });
};
