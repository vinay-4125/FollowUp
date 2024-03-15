const { sampleActionCallback } = require("./actions");

module.exports.register = (app) => {
  app.action("sample_action_id", sampleActionCallback);
};
