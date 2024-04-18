const { appHomeOpenedCallback, addMembersFromSlack } = require("./events");

module.exports.register = (app) => {
  app.event("app_home_opened", appHomeOpenedCallback);
  // app.event("app_installed", addMembersFromSlack);
};
