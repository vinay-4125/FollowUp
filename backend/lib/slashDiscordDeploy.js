const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const botID = process.env.DISCORD_BOT_ID;
const botToken = process.env.DISCORD_TOKEN;

const rest = new REST().setToken(botToken);
module.exports.slashRegister = async () => {
  try {
    await rest.put(Routes.applicationCommands(botID), {
      body: [
        new SlashCommandBuilder()
          .setName("setreminder")
          .setDescription("Setreminders for yourself or other server memebers.")
          .addStringOption((option) =>
            option
              .setName("title")
              .setDescription("Add reminder title")
              .setRequired(true)
          )
          .addStringOption((option) =>
            option.setName("date").setDescription("Add date").setRequired(true)
          )
          .addStringOption((option) =>
            option.setName("time").setDescription("Add time").setRequired(true)
          )
          .addStringOption((option) =>
            option
              .setName("members")
              .setDescription("Add members")
              .setRequired(true)
          ),
        new SlashCommandBuilder()
          .setName("addmembertofollowup")
          .setDescription("Add Members to the FollowUp."),
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
