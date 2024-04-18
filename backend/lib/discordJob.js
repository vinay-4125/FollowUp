const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
  UserSelectMenuBuilder,
  SelectMenuBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  MessageEmbed,
} = require("discord.js");
const { slashRegister } = require("./slashDiscordDeploy");
const discordModal = require("./discord-modal");
const moment = require("moment");
const { default: axios } = require("axios");
const Agenda = require("agenda");

const agenda = new Agenda({ db: { address: process.env.MONGODBURL } });

module.exports.discordFunc = () => {
  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMembers,
    ],
  });

  discordClient.on("ready", () => {
    console.log("Discord Ready");
  });

  // discordClient.on("interactionCreate", async (interaction) => {
  //   if (interaction.type !== InteractionType.ApplicationCommand) return;
  //   if (interaction.commandName === "setreminder") {
  //     const guildMembers = interaction.guild.members.cache.map((member) => ({
  //       label: member.user.username,
  //       value: member.id,
  //     }));
  //     console.log("SERVER MEMBERS", guildMembers);
  //     const modal = new ModalBuilder({
  //       customId: `discordModal`,
  //       title: `Create Reminder`,
  //     });
  //     const reminderTitle = new TextInputBuilder({
  //       customId: "reminderTitle",
  //       label: "Reminder Title",
  //       style: TextInputStyle.Short,
  //     });

  //     const description = new TextInputBuilder({
  //       customId: "description",
  //       label: "Description",
  //       style: TextInputStyle.Paragraph,
  //     });

  //     const listMembers = new UserSelectMenuBuilder()
  //       .setCustomId("users")
  //       .setPlaceholder("Select Members...")
  //       .setMinValues(1);

  //     const firstActionRow = new ActionRowBuilder().addComponents(
  //       reminderTitle
  //     );
  //     const secondActionRow = new ActionRowBuilder().addComponents(description);

  //     const thirdActionRow = new ActionRowBuilder().addComponents(listMembers);

  //     modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
  //     await interaction.showModal(modal);
  //   }
  // });
  // discordClient.on("interactionCreate", async (interaction) => {
  //   if (!interaction.isModalSubmit()) return;
  //   if (interaction.customId === "discordModal") {
  //     await interaction.reply({
  //       content: "Your submission was received successfully!",
  //     });
  //     const reminderTitle =
  //       interaction.fields.getTextInputValue("reminderTitle");
  //     const description = interaction.fields.getTextInputValue("description");
  //     console.log({ reminderTitle, description });
  //   }
  // });

  // discordClient.on("interactionCreate", async (interaction) => {
  //   if (interaction.isCommand()) {
  //     if (interaction.commandName == "setreminder") {
  //       // interaction.reply("This is a test command");
  //       const dateReceived = interaction.options.getString("date");
  //       const timeReceived = interaction.options.getString("time");
  //       interaction.reply({
  //         content: `Reminder set at ${dateReceived} | ${timeReceived}`,
  //       });
  //     }
  //   }
  // });

  // discordClient.on("interactionCreate", async (interaction) => {
  //   if (interaction.type !== InteractionType.ApplicationCommand) return;
  //   if (interaction.commandName === "setreminder") {
  //     const guildMembers = interaction.guild.members.cache.map((member) => ({
  //       label: member.user.username,
  //       value: member.id,
  //     }));

  //     const listMembers = new StringSelectMenuBuilder()
  //       .setCustomId("listmembers")
  //       .setMinValues(1)
  //       .setPlaceholder("Select members...")
  //       .addOptions(
  //         guildMembers.map((item) =>
  //           new StringSelectMenuOptionBuilder()
  //             .setLabel(item.label)
  //             .setValue(item.value)
  //         )
  //       );

  //     const actionRow = new ActionRowBuilder().addComponents(listMembers);
  //     interaction.reply({ components: [actionRow] });
  //   }
  // });

  discordClient.on("interactionCreate", async (interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    if (interaction.commandName === "addmembertofollowup") {
      const guild = interaction.guild;
      if (!guild) {
        console.log("Error");
        return;
      }

      try {
        await guild.members.fetch(); // Fetch all members in the guild
      } catch (error) {
        console.error("Error fetching members:", error);
        return;
      }

      const memberId = guild.members.cache
        .filter((member) => !member.user.bot) // Filter out bot members
        .map((member) => {
          return `${member.id} - ${
            member.displayName
          } - ${member.user.displayAvatarURL()} -`;
        });
      console.log(memberId);
      await interaction.reply(
        `Member IDs of the server: ${memberId.join(",")}`
      );
    }
  });

  discordClient.on("interactionCreate", async (interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    if (interaction.commandName === "setreminder") {
      const date = interaction.options.getString("date");
      const time = interaction.options.getString("time");
      const title = interaction.options.getString("title");
      const membersList = interaction.options.getString("members");

      const dateReverse = date.split("-").reverse().join("-");

      interaction.reply({
        content: `Reminder set at ${date} | ${time} | ${membersList} | ${title}`,
      });

      console.log(
        `Reminder set at ${date} | ${time} | ${membersList} | ${title}`
      );
      const reminderMessage = `Reminder set at ${date} | ${time} | ${membersList} | ${title}`;
      const mentionRegex = /<@!?(\d+)>/g;

      const mentions = reminderMessage.match(mentionRegex);
      const user_id = interaction.user.id;
      const members = mentions
        ? mentions.map((mention) => mention.match(/\d+/)[0])
        : [];

      const remindAt = dateReverse + "T" + time + "+05:30";
      let colors = [
        "#FF5733",
        "#FFD700",
        "#4CAF50",
        "#3498DB",
        "#9B59B6",
        "#E74C3C",
        "#578885",
        "#94a3b8",
        "#f87171",
        "#fb923c",
        "#fbbf24",
        "#34d399",
        "#22d3ee",
        "#818cf8",
        "#e879f9",
        "#fb7185",
      ];
      const notification = ["discord"];
      const repeat = "norepeat";
      const random = Math.floor(Math.random() * colors.length);
      const color = colors[random];
      try {
        await axios.post("http://localhost:8000/api/reminder", {
          userId: "65e59ed5f743fbd023c6a69d",
          notification,
          repeat,
          color,
          date: dateReverse,
          time,
          listMembers: members,
          description: title,
          reminderName: title,
        });
      } catch (error) {
        console.log(error);
      }

      await agenda.start();
      await agenda.schedule(remindAt, "sendDiscordReminder");
      agenda.define("sendDiscordReminder", async (job) => {
        for (const userId of members) {
          const user = await discordClient.users.fetch(userId);
          if (user) {
            await user.send(`Reminder: Don't forget about "${title}"`);
          } else {
            console.log(`User with ID ${userId} not found.`);
          }
        }
      });
    }
  });
  slashRegister();

  discordClient.login(process.env.DISCORD_TOKEN);
  return discordClient;
};
