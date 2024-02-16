const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    slackId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
