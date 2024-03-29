const { SlackUser } = require("../slackidModel");
const saveUserWorkspaceInstall = async function (installation, _userId) {
  const resp = await SlackUser.updateOne(
    { _id: installation.team.id },
    {
      team: { id: installation.team.id, name: installation.team.name },
      // entperise id is null on workspace install
      enterprise: { id: "null", name: "null" },
      // user scopes + token is null on workspace install
      user: { token: "null", scopes: "null", id: installation.user.id },
      _userId: _userId,
      tokenType: installation.tokenType,
      isEnterpriseInstall: installation.isEnterpriseInstall,
      appId: installation.appId,
      authVersion: installation.authVersion,
      bot: {
        scopes: installation.bot.scopes,
        token: installation.bot.token,
        userId: installation.bot.userId,
        id: installation.bot.id,
      },
    },
    { upsert: true }
  );
  return resp;
};
module.exports = { saveUserWorkspaceInstall };
