const { sampleShortcutCallback } = require("../shortcuts/shortcuts");
const sampleCommandCallback = require("./commands");

module.exports.register = (app) => {
  app.command("/hello", sampleCommandCallback.hello);
  app.command("/echo", sampleCommandCallback.echo);
  app.command("/getallmembers", sampleCommandCallback.getallmembers);
  app.command("/setreminder", sampleCommandCallback.setreminder);
};
