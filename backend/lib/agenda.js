const Agenda = require("agenda");
const Reminder = require("../models/reminderModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.APPPASS,
  },
});

const agenda = new Agenda({ db: { address: process.env.MONGODBURL } });
agenda.define("sendReminder", async (job) => {
  const reminder = await Reminder.findById(job.attrs.data.reminder._id);
  //   if (reminder.repeat) {
  //     if (reminder.repeat === "norepeat") {
  //       return;
  //     }
  //     job.repeatEvery(reminder.repeat);
  //     await job.save();
  //   }
  const mailOptions = {
    from: {
      name: "FollowUp.",
      address: process.env.MYEMAIL,
    }, // sender address
    to: "vinaychaudhari4125@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  sendMail(transporter, mailOptions);
  console.log(
    `Sending reminder to ${reminder._userId} for ${reminder.eventName}\n Email sent`
  );
});

module.exports = agenda;
