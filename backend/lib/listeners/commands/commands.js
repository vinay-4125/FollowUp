const Member = require("../../../models/memberModel");

module.exports.hello = async ({ ack, respond }) => {
  try {
    await ack();
    await respond("Helloworld");
  } catch (error) {
    console.error(error);
  }
};

module.exports.setreminder = async ({ body, view, ack, client, logger }) => {
  await ack();
  try {
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        callback_id: "reminder-modal",
        title: {
          type: "plain_text",
          text: "Create a reminder",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        type: "modal",
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "What to remind",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              multiline: true,
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "Description",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "multi_users_select",
              placeholder: {
                type: "plain_text",
                text: "Select users",
                emoji: true,
              },
              action_id: "multi_users_select-action",
            },
            label: {
              type: "plain_text",
              text: "Users to send reminder",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Pick a date for the deadline.",
            },
            accessory: {
              type: "datepicker",
              placeholder: {
                type: "plain_text",
                text: "Select a date",
                emoji: true,
              },
              action_id: "datepicker-action",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Section block with a timepicker",
            },
            accessory: {
              type: "timepicker",
              placeholder: {
                type: "plain_text",
                text: "Select time",
                emoji: true,
              },
              action_id: "timepicker-action",
            },
          },
        ],
      },
    });

    // console.log(response);
  } catch (error) {
    logger.error(error);
  }
};

module.exports.getallmembers = async ({ ack, say, client }) => {
  // Acknowledge the command
  await ack();

  try {
    // Call the API to get the list of all users in the workspace
    const result = await client.users.list();

    // Extract user IDs from the response
    const membersDetails = result.members
      .filter((bot) => bot.is_bot !== true)
      .map((member) => [member.id, member.real_name, member.profile.phone]);

    const addMembers = await Member.find();
    await say(`All members' IDs: ${membersDetails.join(" | ")}`);
  } catch (error) {
    console.error("Error getting members:", error);
  }
};

// {
//   "ok": true,
//   "members": [
//     {
//       "id": "USLACKBOT",
//       "team_id": "T06NTP2J621",
//       "name": "slackbot",
//       "deleted": false,
//       "color": "757575",
//       "real_name": "Slackbot",
//       "tz": "America/Los_Angeles",
//       "tz_label": "Pacific Daylight Time",
//       "tz_offset": -25200,
//       "profile": {
//         "title": "",
//         "phone": "",
//         "skype": "",
//         "real_name": "Slackbot",
//         "real_name_normalized": "Slackbot",
//         "display_name": "Slackbot",
//         "display_name_normalized": "Slackbot",
//         "fields": {},
//         "status_text": "",
//         "status_emoji": "",
//         "status_emoji_display_info": [],
//         "status_expiration": 0,
//         "avatar_hash": "sv41d8cd98f0",
//         "always_active": true,
//         "first_name": "slackbot",
//         "last_name": "",
//         "image_24": "https://a.slack-edge.com/80588/img/slackbot_24.png",
//         "image_32": "https://a.slack-edge.com/80588/img/slackbot_32.png",
//         "image_48": "https://a.slack-edge.com/80588/img/slackbot_48.png",
//         "image_72": "https://a.slack-edge.com/80588/img/slackbot_72.png",
//         "image_192": "https://a.slack-edge.com/80588/marketing/img/avatars/slackbot/avatar-slackbot.png",
//         "image_512": "https://a.slack-edge.com/80588/img/slackbot_512.png",
//         "status_text_canonical": "",
//         "team": "T06NTP2J621"
//       },
//       "is_admin": false,
//       "is_owner": false,
//       "is_primary_owner": false,
//       "is_restricted": false,
//       "is_ultra_restricted": false,
//       "is_bot": false,
//       "is_app_user": false,
//       "updated": 0,
//       "is_email_confirmed": false,
//       "who_can_share_contact_card": "EVERYONE"
//     },
//     {
//       "id": "U06NVBHJRJS",
//       "team_id": "T06NTP2J621",
//       "name": "vinaychaudhari4125",
//       "deleted": false,
//       "color": "e7392d",
//       "real_name": "Vinay Chaudhari",
//       "tz": "Asia/Kolkata",
//       "tz_label": "India Standard Time",
//       "tz_offset": 19800,
//       "profile": {
//         "title": "",
//         "phone": "",
//         "skype": "",
//         "real_name": "Vinay Chaudhari",
//         "real_name_normalized": "Vinay Chaudhari",
//         "display_name": "Vinay Chaudhari",
//         "display_name_normalized": "Vinay Chaudhari",
//         "fields": null,
//         "status_text": "",
//         "status_emoji": "",
//         "status_emoji_display_info": [],
//         "status_expiration": 0,
//         "avatar_hash": "ec960d9441af",
//         "image_original": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_original.png",
//         "is_custom_image": true,
//         "first_name": "Vinay",
//         "last_name": "Chaudhari",
//         "image_24": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_24.png",
//         "image_32": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_32.png",
//         "image_48": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_48.png",
//         "image_72": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_72.png",
//         "image_192": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_192.png",
//         "image_512": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_512.png",
//         "image_1024": "https://avatars.slack-edge.com/2024-03-12/6769471012055_ec960d9441af26b4574d_1024.png",
//         "status_text_canonical": "",
//         "team": "T06NTP2J621"
//       },
//       "is_admin": false,
//       "is_owner": false,
//       "is_primary_owner": false,
//       "is_restricted": false,
//       "is_ultra_restricted": false,
//       "is_bot": false,
//       "is_app_user": false,
//       "updated": 1710229065,
//       "is_email_confirmed": true,
//       "who_can_share_contact_card": "EVERYONE"
//     },
//     {
//       "id": "U06NWHA21JP",
//       "team_id": "T06NTP2J621",
//       "name": "brandedgroup21",
//       "deleted": false,
//       "color": "9f69e7",
//       "real_name": "Jadav Tanmay",
//       "tz": "Asia/Kolkata",
//       "tz_label": "India Standard Time",
//       "tz_offset": 19800,
//       "profile": {
//         "title": "",
//         "phone": "",
//         "skype": "",
//         "real_name": "Jadav Tanmay",
//         "real_name_normalized": "Jadav Tanmay",
//         "display_name": "",
//         "display_name_normalized": "",
//         "fields": null,
//         "status_text": "",
//         "status_emoji": "",
//         "status_emoji_display_info": [],
//         "status_expiration": 0,
//         "avatar_hash": "b183a21cffcb",
//         "image_original": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_original.png",
//         "is_custom_image": true,
//         "first_name": "Jadav",
//         "last_name": "Tanmay",
//         "image_24": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_24.png",
//         "image_32": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_32.png",
//         "image_48": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_48.png",
//         "image_72": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_72.png",
//         "image_192": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_192.png",
//         "image_512": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_512.png",
//         "image_1024": "https://avatars.slack-edge.com/2024-03-11/6764144499815_b183a21cffcb9d3df03c_1024.png",
//         "status_text_canonical": "",
//         "team": "T06NTP2J621"
//       },
//       "is_admin": true,
//       "is_owner": true,
//       "is_primary_owner": true,
//       "is_restricted": false,
//       "is_ultra_restricted": false,
//       "is_bot": false,
//       "is_app_user": false,
//       "updated": 1710162617,
//       "is_email_confirmed": true,
//       "who_can_share_contact_card": "EVERYONE"
//     },
//     {
//       "id": "U06NZ53BWGL",
//       "team_id": "T06NTP2J621",
//       "name": "followupbot",
//       "deleted": false,
//       "color": "4bbe2e",
//       "real_name": "FollowUpBot",
//       "tz": "America/Los_Angeles",
//       "tz_label": "Pacific Daylight Time",
//       "tz_offset": -25200,
//       "profile": {
//         "title": "",
//         "phone": "",
//         "skype": "",
//         "real_name": "FollowUpBot",
//         "real_name_normalized": "FollowUpBot",
//         "display_name": "",
//         "display_name_normalized": "",
//         "fields": null,
//         "status_text": "",
//         "status_emoji": "",
//         "status_emoji_display_info": [],
//         "status_expiration": 0,
//         "avatar_hash": "g6bab6c5f5f2",
//         "api_app_id": "A06NN4UK97Y",
//         "always_active": false,
//         "bot_id": "B06NWM2MTRQ",
//         "first_name": "FollowUpBot",
//         "last_name": "",
//         "image_24": "https://secure.gravatar.com/avatar/6bab6c5f5f28c6143454d0098b74dd54.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0023-24.png",
//         "image_32": "https://secure.gravatar.com/avatar/6bab6c5f5f28c6143454d0098b74dd54.jpg?s=32&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0023-32.png",
//         "image_48": "https://secure.gravatar.com/avatar/6bab6c5f5f28c6143454d0098b74dd54.jpg?s=48&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0023-48.png",
//         "image_72": "https://secure.gravatar.com/avatar/6bab6c5f5f28c6143454d0098b74dd54.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0023-72.png",
//         "image_192": "https://secure.gravatar.com/avatar/6bab6c5f5f28c6143454d0098b74dd54.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0023-192.png",
//         "image_512": "https://secure.gravatar.com/avatar/6bab6c5f5f28c6143454d0098b74dd54.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0023-512.png",
//         "status_text_canonical": "",
//         "team": "T06NTP2J621"
//       },
//       "is_admin": false,
//       "is_owner": false,
//       "is_primary_owner": false,
//       "is_restricted": false,
//       "is_ultra_restricted": false,
//       "is_bot": true,
//       "is_app_user": false,
//       "updated": 1710231887,
//       "is_email_confirmed": false,
//       "who_can_share_contact_card": "EVERYONE"
//     }
//   ],
//   "cache_ts": 1710231957,
//   "response_metadata": {
//     "next_cursor": "",
//     "scopes": [
//       "channels:read",
//       "commands",
//       "channels:history",
//       "groups:history",
//       "im:history",
//       "mpim:history",
//       "users:read"
//     ],
//     "acceptedScopes": [
//       "users:read"
//     ]
//   }
// }
