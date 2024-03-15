const { sampleShortcutCallback } = require('./shortcuts');

module.exports.register = (app) => {
  app.shortcut('sample_shortcut_id', sampleShortcutCallback);
};