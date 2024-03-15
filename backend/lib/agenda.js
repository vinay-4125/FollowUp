const Agenda = require("agenda");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const { findUser } = require("../models/slackidModel");
const orgInstall = require("../models/slackdb/store_user_org_install");
const workspaceAuth = require("../models/slackdb/store_user_workspace_install");
const { App, LogLevel } = require("@slack/bolt");
const { registerListeners } = require("./listeners");
const manifest = require("../manifest.json");
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

const oauthRedirect = manifest.oauth_config.redirect_urls[0];
const botScopes = manifest.oauth_config.scopes.bot;
const userScopes = manifest.oauth_config.scopes.user;

workspaceInstallHtml = `<a href='https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=${botScopes}&redirect_uri=${oauthRedirect}' style='align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato,sans-serif;font-size:40px;font-weight:600;height:112px;justify-content:center;text-decoration:none;width:552px'><svg xmlns='http://www.w3.org/2000/svg' style='height:48px;width:48px;margin-right:12px' viewBox='0 0 122.8 122.8'><path d='M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z' fill='#e01e5a'></path><path d='M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z' fill='#36c5f0'></path><path d='M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z' fill='#2eb67d'></path><path d='M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z' fill='#ecb22e'></path></svg>Add to Slack</a>`;
userScopesInstallHtml = `<a href='https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=&user_scope=${userScopes}&redirect_uri=${oauthRedirect}' style='align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato,sans-serif;font-size:40px;font-weight:600;height:112px;justify-content:center;text-decoration:none;width:552px'><svg xmlns='http://www.w3.org/2000/svg' style='height:48px;width:48px;margin-right:12px' viewBox='0 0 122.8 122.8'><path d='M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z' fill='#e01e5a'></path><path d='M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z' fill='#36c5f0'></path><path d='M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z' fill='#2eb67d'></path><path d='M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z' fill='#ecb22e'></path></svg>Add to Slack</a>`;

const customRoutes = [
  {
    path: "/slack/install/workspace",
    method: ["GET"],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(workspaceInstallHtml);
    },
  },
  {
    path: "/slack/install/orgadmin",
    method: ["GET"],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(userScopesInstall);
    },
  },
];

const slackapp = new App({
  // token: process.env.SLACK_BOT_TOKEN,
  // logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: "followup-secret",
  // scopes: ["commands"],
  customRoutes: customRoutes,
  installerOptions: {
    stateVerification: false,
  },
  installationStore: {
    storeInstallation: async (installation) => {
      console.log("installation: ");
      console.log(installation);
      if (
        installation.isEnterpriseInstall &&
        installation.enterprise !== undefined
      ) {
        return await orgInstall.saveUserOrgInstall(installation);
      }
      if (installation.team !== undefined) {
        return await workspaceAuth.saveUserWorkspaceInstall(installation);
      }
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      console.log("installQuery");
      console.log(installQuery);
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        return await findUser(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        return await findUser(installQuery.teamId);
      }
      throw new Error("Failed fetching installation");
    },
  },
});

// slackapp.message(async ({ message, client, logger }) => {
//   try {
//     const result = await client.chat.postMessage({
//       channel: "C06NWHESSJF",
//       text: "def",
//     });
//     console.log(result);
//   } catch (error) {
//     logger.error(error);
//   }
// });

// slackapp.message("hello", async (ack, say) => {
//   await ack();
//   await say({
//     text: "Hi there!",
//     channel: "C06NTP2LQKF", // Replace with the actual channel ID
//   });
// });

registerListeners(slackapp);

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

(async () => {
  try {
    await slackapp.start(5001);
    console.log("⚡️ Bolt app is running! ⚡️");
  } catch (error) {
    console.error("Unable to start App", error);
  }
})();

module.exports = {
  slackMiddleware: (req, res, next) => {
    req.slackapp = slackapp;
    next();
  },
  agenda,
};
