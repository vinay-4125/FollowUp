const { default: mongoose } = require("mongoose");
const { reminderSchema } = require("./reminderModel");

const arrReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reminders: [reminderSchema],
});

const ArrayReminder = mongoose.model("ArrayReminder", arrReminderSchema);

module.exports = ArrayReminder;
