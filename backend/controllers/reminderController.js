const { Reminder } = require("../models/reminderModel");
const { agenda, getUserIdForSlack } = require("../lib/agenda.js");
const User = require("../models/userModel");
const ArrayReminder = require("../models/arrayReminderModel");
const manifest = require("../manifest.json");

module.exports.reminder = async (req, res) => {
  try {
    const {
      notification,
      listMembers,
      repeat,
      description,
      time,
      date,
      reminderName,
      color,
      userId,
    } = req.body;
    console.log({
      notification,
      listMembers,
      repeat,
      description,
      time,
      date,
      reminderName,
      color,
      userId,
    });
    if (
      !(
        notification &&
        listMembers &&
        repeat &&
        description &&
        time &&
        date &&
        reminderName &&
        color &&
        userId
      )
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const reminder = await Reminder.create({
      _userId: userId,
      notification,
      listMembers,
      repeat,
      description,
      time,
      date,
      reminderName,
      color,
    });
    const updateUserDocument = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $push: { reminders: reminder } }
    );

    const checkInArrayReminder = await ArrayReminder.findOne({
      userId,
    });
    if (checkInArrayReminder) {
      const addToArrayReminder = await ArrayReminder.findOneAndUpdate(
        { userId },
        { $push: { reminders: reminder } }
      );
    } else {
      const newAddToArrayReminder = await ArrayReminder.create({
        userId,
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
      message: `Reminder Set for ${reminderName} at ${date}/${time} `,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.findUpcomingEvents = async (req, res) => {
  const { userId } = req.params;
  const currentDate = new Date();
  const isoDateString = currentDate.toISOString();
  const datePart = isoDateString.split("T")[0];
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const time = `${hours}:${minutes}`;
  try {
    const result = await Reminder.find({
      _userId: userId,
      $or: [
        { date: { $gt: datePart } },
        {
          date: { $gte: datePart },
          time: { $gte: time },
        },
      ],
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
