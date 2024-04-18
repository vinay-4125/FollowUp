const { default: mongoose } = require("mongoose");
const { Reminder } = require("../models/reminderModel");
const User = require("../models/userModel");
const ArrayReminder = require("../models/arrayReminderModel");
const SuperAdmin = require("../models/superAdminModel");
const bcrypt = require("bcryptjs");

module.exports.superAdminSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = SuperAdmin.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "SA created!!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.superAdminLogin = async (req, res) => {
  const { password } = req.body;
  try {
    const result = await SuperAdmin.findOne({ username: "SuperAdmin" });
    const unhashed = await bcrypt.compare(password, result.password);
    if (unhashed) {
      res.status(200).json({ message: "SA Logged In!!!" });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

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
  // console.log(startDate, endDate);
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

module.exports.getFailedCount = async (req, res) => {
  try {
    const result = await mongoose.connection.db
      .collection("agendaJobs")
      .aggregate([
        {
          $match: {
            failReason: { $exists: true },
            failCount: { $exists: true },
          },
        },
        {
          $count: "totalDocuments",
        },
      ])
      .toArray();

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getSuccessCount = async (req, res) => {
  try {
    const result = await mongoose.connection.db
      .collection("agendaJobs")
      .aggregate([
        {
          $match: {
            failReason: { $exists: false },
            failCount: { $exists: false },
          },
        },
        {
          $count: "totalDocuments",
        },
      ])
      .toArray();

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getDailyFailedReminders = async (req, res) => {
  const { fromDate, toDate } = req.query;
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  try {
    const result = mongoose.connection.db.collection("agendaJobs").aggregate([
      {
        $match: {
          failedAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$failedAt" },
            month: { $month: "$failedAt" },
            day: { $dayOfMonth: "$failedAt" },
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

module.exports.getAllUserReminderData = async (req, res) => {
  try {
    const result = await ArrayReminder.aggregate([
      {
        $group: {
          _id: {
            userId: "$userId",
            id: "$_id",
            reminders: { $size: "$reminders" },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $project: {
          _id: "$_id.id",
          userId: "$_id.userId",
          remindersCount: "$_id.reminders",
          userData: {
            username: "$userData.username",
            email: "$userData.email",
            profilePicture: "$userData.profilePicture",
          },
        },
      },
    ]);
    // console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getTotalNumberOfSuccessReminders = async (req, res) => {
  try {
    const result = await mongoose.connection.db
      .collection("agendaJobs")
      .aggregate([
        {
          $match: {
            failReason: { $exists: false },
            failCount: { $exists: false },
          },
        },
        {
          $group: {
            _id: {
              // $dateToString: { format: "%Y-%m-%d", date: "$lastRunAt" },
              year: { $year: "$lastRunAt" },
              month: { $month: "$lastRunAt" },
              day: { $dayOfMonth: "$lastRunAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
      .toArray();

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
