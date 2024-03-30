const { default: mongoose } = require("mongoose");
const { Reminder } = require("../models/reminderModel");
const User = require("../models/userModel");

module.exports.getTotalNumberOfReminder = async (req, res) => {
  const { fromDate, toDate } = req.query;
  const convertFromDate = new Date(fromDate).toISOString();
  const convertToDate = new Date(toDate).toISOString();
  // console.log(convertFromDate, convertToDate);
  try {
    const result = await Reminder.countDocuments({
      date: {
        $gte: convertFromDate,
        $lt: convertToDate,
      },
    });
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
  const { fromDate, toDate } = req.query;
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  try {
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

