const agenda = require("../lib/agenda");
const { Reminder } = require("../models/reminderModel");
const User = require("../models/userModel");
const ArrayReminder = require("../models/arrayReminderModel");

module.exports.reminder = async (req, res) => {
  try {
    const {
      notification,
      listMembers,
      repeat,
      description,
      time,
      date,
      eventName,
      color,
    } = req.body;
    console.log({
      notification,
      listMembers,
      repeat,
      description,
      time,
      date,
      eventName,
      color
    });
    if (
      !(
        notification &&
        listMembers &&
        repeat &&
        description &&
        time &&
        date &&
        eventName &&
        color
      )
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const reminder = await Reminder.create({
      _userId: "65d5f0ab66b7081caf60b2aa",
      notification,
      listMembers,
      repeat,
      description,
      time,
      date,
      eventName,
      color
    });
    const updateUserDocument = await User.findByIdAndUpdate(
      {
        _id: "65bd0af0f3768faaa8f01e48",
      },
      { $push: { reminders: reminder } }
    );


    const checkInArrayReminder = await ArrayReminder.findOne({
      userId: "65bd0af0f3768faaa8f01e48",
    });
    if (checkInArrayReminder) {
      const addToArrayReminder = await ArrayReminder.findOneAndUpdate(
        { userId: "65bd0af0f3768faaa8f01e48" },
        { $push: { reminders: reminder } }
      );
    } else {
      const newAddToArrayReminder = await ArrayReminder.create({
        userId: "65bd0af0f3768faaa8f01e48",
        reminders: reminder,
      });
    }

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
