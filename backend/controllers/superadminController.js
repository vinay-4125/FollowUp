const { Reminder } = require("../models/reminderModel");
const User = require("../models/userModel");

module.exports.getTotalNumberOfReminder = async (req, res) => {
  try {
    const result = await Reminder.countDocuments();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getTotalNumberOfUser = async (req, res) => {
  try {
    const result = await User.countDocuments();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getNumberOfDailyRemindersCreated = async (req, res) => {
  try {
    const startDate = new Date("2024-01-01");
    const endDate = new Date();
    const result = await Reminder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
