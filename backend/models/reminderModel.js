const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  repeat: {
    type: String,
    required: true,
  },
  listMembers: {
    type: Array,
    required: true,
  },
  notification: {
    type: Array,
    required: true,
  },
});

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = Reminder;

