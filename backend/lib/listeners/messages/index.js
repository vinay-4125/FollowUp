const { sampleMessageCallback } = require("./messages");

module.exports.register = (app) => {
  app.message("hi", sampleMessageCallback);
};
