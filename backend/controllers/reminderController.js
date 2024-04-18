const { Reminder } = require("../models/reminderModel");
const { agenda, getUserIdForSlack } = require("../lib/agenda.js");
const User = require("../models/userModel");
const ArrayReminder = require("../models/arrayReminderModel");
const { default: mongoose } = require("mongoose");

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
    // res.status(200).json({
    //   message: `Reminder Set for ${reminderName} at ${date}/${time} `,
    // });
    res.status(200).json({
      reminder,
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
          date: datePart,
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

module.exports.findReminderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Reminder.findById(id);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.deleteReminderById = async (req, res) => {
  const { _id, userId } = req.query;
  try {
    const reminderDelete = await Reminder.findByIdAndDelete({ _id });
    const arrayReminderDelete = await ArrayReminder.findOneAndUpdate(
      {
        userId,
      },
      { $pull: { reminders: { _id } } }
    );
    const agendaReminderDelete = await mongoose.connection.db
      .collection("agendaJobs")
      .deleteOne({ "data.reminder._id": new mongoose.Types.ObjectId(_id) });

    res.status(200).json({ message: "Reminder Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.updateReminder = async (req, res) => {
  const {
    notification,
    listMembers,
    repeat,
    description,
    time,
    date,
    reminderName,
    color,
    id,
    userId,
  } = req.body;
  try {
    const result = await Reminder.findByIdAndUpdate(
      { _id: id },
      {
        notification,
        listMembers,
        repeat,
        description,
        time,
        date,
        reminderName,
        color,
        _userId: userId,
      }
    );
    const arrayReminderResult = await ArrayReminder.updateOne(
      { "reminders._id": id },
      {
        $set: {
          "reminders.$[elem].notification": notification,
          "reminders.$[elem].listMembers": listMembers,
          "reminders.$[elem].repeat": repeat,
          "reminders.$[elem].description": description,
          "reminders.$[elem].time": time,
          "reminders.$[elem].date": date,
          "reminders.$[elem].reminderName": reminderName,
          "reminders.$[elem].color": color,
        },
      },
      { arrayFilters: [{ "elem._id": id }] }
    );
    if (result && arrayReminderResult) {
      res.status(200).json({ message: "Reminder Updated!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// module.exports.getSuccessReminderByUserId = async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const result = await mongoose.connection.db
//       .collection("agendaJobs")
//       .aggregate([
//         {
//           $match: {
//             "data.reminder._userId": userId,
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             successCount: {
//               $sum: { $cond: [{ $eq: ["$failCount", undefined] }, 1, 0] },
//             },
//             failCount: {
//               $sum: { $cond: [{ $ne: ["$failCount", undefined] }, 1, 0] },
//             },
//           },
//         },
//       ])
//       .toArray();
//     console.log(result);
//     res.status(200).json({ result });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error });
//   }
// };

module.exports.singleAgendaJobsDeleteDocument = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await mongoose.connection.db
      .collection("agendaJobs")
      .deleteOne({ "data.reminder._id": new mongoose.Types.ObjectId(_id) });
    console.log(result);
    if (result) {
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(400).json({ message: "An error occurred" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.deleteReminderFromAgendaJobs = async (req, res) => {
  try {
    const reminderResult = await Reminder.find({}, "_id");
    const reminderArray = reminderResult.map((item) => item._id);
    const agendaJobs = await mongoose.connection.db
      .collection("agendaJobs")
      .deleteMany({ "data.reminder._id": { $nin: reminderArray } });
    if (agendaJobs) {
      res.status(200).json({ agendaJobs });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
