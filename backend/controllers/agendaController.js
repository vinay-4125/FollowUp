const { default: mongoose } = require("mongoose");
const ArrayReminder = require("../models/arrayReminderModel");
const io = require("../index.js");
const { Reminder } = require("../models/reminderModel.js");

module.exports.allReminders = async (req, res) => {
  try {
    const allData = await mongoose.connection.db
      .collection("agendaJobs")
      .find()
      .toArray();
    // const allData = await AgendaJobs.findById("65c2098622558beb690ab9d9");
    // console.log(allData);
    res.status(200).json({ allData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// module.exports.allRemindersById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const allData = await mongoose.connection.db
//       .collection("agendaJobs")
//       .find({ "data.reminder._userId": new mongoose.Types.ObjectId(id) })
//       .toArray();
//     res.status(200).json({ allData });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error });
//   }
// };

module.exports.allRemindersById = async (req, res) => {
  const { id } = req.params;
  try {
    const allData = await ArrayReminder.findOne({ userId: id });
    // const allData = await ArrayReminder.aggregate([
    //   {
    //     $match: {
    //       userId: id,
    //     },
    //   },
    //   {
    //     $unwind: "$reminders",
    //   },
    //   {
    //     $addFields: {
    //       "reminders.combinedDateTime": {
    //         $concat: ["$reminders.date", "T", "$reminders.time"],
    //       },
    //     },
    //   },
    //   {
    //     $sort: {
    //       "reminders.combinedDateTime": 1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       reminders: { $push: "$reminders" },
    //     },
    //   },
    // ]);
    res.status(200).json({ allData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
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

    res.status(200).json({ message: "Reminder Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
