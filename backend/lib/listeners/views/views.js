const Agenda = require("agenda");
const { Reminder } = require("../../../models/reminderModel");
const { SlackUser } = require("../../../models/slackidModel");
const { default: axios } = require("axios");

const agenda = new Agenda({ db: { address: process.env.MONGODBURL } });

// async function displayErrorModal(client, errorMessage, viewId) {
//   try {
//     await client.views.update({
//       view_id: viewId,
//       view: {
//         type: "modal",
//         title: {
//           type: "plain_text",
//           text: "Error",
//         },
//         blocks: [
//           {
//             type: "section",
//             text: {
//               type: "mrkdwn",
//               text: errorMessage,
//             },
//           },
//         ],
//       },
//     });
//   } catch (error) {
//     console.log("Error displaying modal: ", error);
//   }
// }

module.exports.response_view = async ({ ack, body, view, client, logger }) => {
  try {
    await ack();
    // console.log("Body", body.user.id);
    const mainResult = view.state.values;

    const title = mainResult["uFHgv"]["plain_text_input-action"]["value"];
    const description = mainResult["YwASX"]["plain_text_input-action"]["value"];
    const members =
      mainResult["iyUce"]["multi_users_select-action"]["selected_users"];
    const date = mainResult["WosaW"]["datepicker-action"]["selected_date"];
    const time = mainResult["kenQN"]["timepicker-action"]["selected_time"];
    const senderId = body.user.id;

    const remindAt = date + "T" + time + "+05:30";

    // const currentDate = new Date().toISOString();

    // if (remindAt <= currentDate) {
    //   await displayErrorModal(
    //     client,
    //     "Please select a future date and time.",
    //     body.view.id
    //   );
    //   return;
    // }

    const result = await SlackUser.findOne({ "user.id": body.user.id });
    // console.log("RESULT", result);
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          title: {
            type: "plain_text",
            text: "Task Created",
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `Task "${title}" has been created successfully.`,
              },
            },
          ],
        },
      });

      let colors = [
        "#FF5733",
        "#FFD700",
        "#4CAF50",
        "#3498DB",
        "#9B59B6",
        "#E74C3C",
        "#578885",
        "#94a3b8",
        "#f87171",
        "#fb923c",
        "#fbbf24",
        "#34d399",
        "#22d3ee",
        "#818cf8",
        "#e879f9",
        "#fb7185",
      ];
      const notification = "slack";
      const repeat = "norepeat";
      const random = Math.floor(Math.random() * colors.length);
      const color = colors[random];
      if (result) {
        // const reminder = await Reminder.create({
        //   _userId: result._userId,
        //   notification,
        //   repeat,
        //   color,
        //   date,
        //   time,
        //   listMembers: members,
        //   description,
        //   reminderName: title,
        // });
        // console.log(reminder);
        try {
          await axios.post("http://localhost:8000/api/reminder", {
            userId: result._userId,
            notification,
            repeat,
            color,
            date,
            time,
            listMembers: members,
            description,
            reminderName: title,
          });
        } catch (error) {
          console.log(error);
        }
      }
      // const reminder = await Reminder.create({
      await agenda.start();
      await agenda.schedule(remindAt, "sendSlackReminder");
      agenda.define("sendSlackReminder", async (job) => {
        if (mainResult) {
          for (const userId of members) {
            await client.chat.postMessage({
              channel: userId,
              text: `Reminder: Don't forget about "${title} - ${description}"`,
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

    // console.log(senderId, title, members, date, time, description);
  } catch (error) {
    logger.error("Error handling view submission:", error);
  }
};
