const sampleViewCallback = require("./views");

module.exports.register = (app) => {
  app.view("reminder-modal", sampleViewCallback.response_view);
};
