const Agenda = require("agenda");
const User = require("../models/userModel");
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

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const agenda = new Agenda({ db: { address: process.env.MONGODBURL } });

agenda.define("sendReminder", async (job) => {
  const jobVariable = job.attrs.data.reminder;
  const user = await User.findById(jobVariable._userId).select(
    "-profilePicture"
  );
  console.log(user);

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
    to: jobVariable.listMembers, // list of receivers
    subject: jobVariable.reminderName, // Subject line
    text: jobVariable.description, // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  if (jobVariable.notification.includes("Email")) {
    sendMail(transporter, mailOptions);
    console.log(
      `Sending reminder to ${jobVariable._userId} for ${jobVariable.reminderName}\n Email sent`
    );
  }

  if (jobVariable.notification.includes("Whatsapp")) {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: "Hello there!",
        to: "whatsapp:+919327097402",
      })
      .then((message) => console.log(message.sid));
  }

  if (jobVariable.notification.includes("Slack")) {
    console.log(`Sending msg to slack`);
  }
});

module.exports = agenda;
