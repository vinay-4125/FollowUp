const { agenda } = require("../lib/agenda");
const { Reminder } = require("../models/reminderModel");
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

module.exports.addSlackButton = (req, res) => {
  const oauthRedirect = manifest.oauth_config.redirect_urls[0];
  const botScopes = manifest.oauth_config.scopes.bot;
  res.redirect(
    303,
    `https://3db5-49-36-91-22.ngrok-free.app/slack/install/workspace`
  );
};
