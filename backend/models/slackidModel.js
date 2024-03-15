const { default: mongoose } = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
    enterprise: { id: String, name: String },
    user: { token: String, scopes: [String], id: String },
    tokenType: String,
    isEnterpriseInstall: Boolean,
    appId: String,
    authVersion: String,
    bot: {
      scopes: [String],
      token: String,
      userId: String,
      id: String,
    },
  },
  { _id: false, timestamps: true }
);

const SlackUser = mongoose.model("SlackUser", usersSchema);

const findUser = async function (id) {
  try {
    const user = await SlackUser.find({ _id: id });
    // return first user we find
    if (user[0] != undefined) {
      return user[0];
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  SlackUser,
  findUser,
};
