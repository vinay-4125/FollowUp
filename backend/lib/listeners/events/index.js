const { appHomeOpenedCallback } = require("./events");

module.exports.register = (app) => {
  app.event("app_home_opened", appHomeOpenedCallback);
};
