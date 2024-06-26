const mongoose = require("mongoose");
const User = require("./userModel");

const memberSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phonenumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    slackId: {
      type: String,
      unique: true,
      sparse: true,
    },
    discordId: {
      type: String,
      unique: true,
      sparse: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.pre("remove", { document: true }, async function (next) {
  console.log("Pre-hook executing for member removal:", this._id);
  try {
    // Find the user associated with this member
    const user = await User.findOne({ _id: this.userId });

    // If user found, remove the reference from the 'members' array
    if (user) {
      user.members.pull(this._id);
      await user.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
