const Member = require("../../../models/memberModel");

const appHomeOpenedCallback = async ({ client, event }) => {
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== "home") return;

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Welcome home, <@${event.user}> :house:*`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>.",
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// const addMembersFromSlack = async ({ client, event }) => {
//   const response = await client.users.list();
//   const membersDetails = response.members.filter((bot) => bot.is_bot !== true);
//   for (const user of membersDetails) {
//     const newMember = await Member.create({
//       firstname: user.real_name,
//       slackId: user.id,
//       userId: "65e59ed5f743fbd023c6a69d",
//     });
//   }
// };

module.exports = {
  appHomeOpenedCallback,
  // addMembersFromSlack
};
