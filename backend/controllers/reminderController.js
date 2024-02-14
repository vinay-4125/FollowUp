const agenda = require("../lib/agenda");
const Reminder = require("../models/reminderModel");


module.exports.reminder = async (req, res) => {
  try {
    const {
      notification,
      listMembers,
      repeat,
      message,
      time,
      date,
      eventName,
    } = req.body;
    if (
      !(
        notification &&
        listMembers &&
        repeat &&
        message &&
        time &&
        date &&
        eventName
      )
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const reminder = await Reminder.create({
      _userId: "65bd0af0f3768faaa8f01e48",
      notification,
      listMembers,
      repeat,
      message,
      time,
      date,
      eventName,
    });
    const remindAt = date + "T" + time + "+05:30";
    console.log(remindAt);
    await agenda.start();
    await agenda.schedule(remindAt, "sendReminder", {
      reminder,
    });
    console.log("Agenda scheudled for:" + reminder._userId);
    res.status(200).json({
      message: `Reminder Set for ${eventName} at ${date}/${time} `,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};


