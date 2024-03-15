const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter an username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      // required: [true, "Please enter a password"],
      minlength: [6, "Minimum length of character is 6 character"],
    },
    slackId: {
      type: String,
      // unique: true,
    },
    phonenumber: {
      type: String,
      // unique: true,
    },
    profilePicture: {
      Data: Buffer,
      ContentType: String,
    },
    reminders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reminder",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "member",
      },
    ],
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const { username, email, _id, slackId, phonenumber, profilePicture } =
        user;
      return { username, email, _id, slackId, phonenumber, profilePicture };
    } else {
      throw Error("Invalid credentials");
    }
  } else {
    throw Error("Invalid credentials");
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
