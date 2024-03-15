const Agenda = require("agenda");
const { Reminder } = require("../../../models/reminderModel");

const agenda = new Agenda({ db: { address: process.env.MONGODBURL } });
module.exports.response_view = async ({ ack, body, view, client, logger }) => {
  try {
    // Acknowledge the view submission
    await ack();

    // Extract the submitted values from the view
    const mainResult = view.state.values;
    console.log(mainResult);
    const title = mainResult["uFHgv"]["plain_text_input-action"]["value"];
    const description = mainResult["YwASX"]["plain_text_input-action"]["value"];
    const members =
      mainResult["iyUce"]["multi_users_select-action"]["selected_users"];
    const date = mainResult["WosaW"]["datepicker-action"]["selected_date"];
    const time = mainResult["kenQN"]["timepicker-action"]["selected_time"];
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
      const remindAt = date + "T" + time + "+05:30";
      // const reminder = await Reminder.create({
      await agenda.start();
      await agenda.schedule(remindAt, "sendSlackReminder");
      // })
      agenda.define("sendSlackReminder", async (job) => {
        console.log("times");
        if (mainResult) {
          for (const userId of members) {
            console.log(userId);
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
    console.log(title, members, date, time, description);
    // Process the submitted data
    // Perform further actions based on the submitted data (e.g., send reminders)
  } catch (error) {
    logger.error("Error handling view submission:", error);
  }
};
