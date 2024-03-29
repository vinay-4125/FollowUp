const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reminderName: {
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
    description: {
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
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = { Reminder, reminderSchema };
