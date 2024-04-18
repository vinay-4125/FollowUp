const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  run: async ({ interaction }) => {
    const modal = new ModalBuilder({
      customId: `discordModal`,
      title: `Create Reminder`,
    });
    const reminderTitle = new TextInputBuilder({
      customId: "reminderTitle",
      label: "Reminder Title",
      style: TextInputStyle.Short,
    });

    const description = new TextInputBuilder({
      customId: "description",
      label: "Description",
      style: TextInputStyle.Paragraph,
    });

    const firstActionRow = new ActionRowBuilder().addComponents(reminderTitle);
    const secondActionRow = new ActionRowBuilder().addComponents(description);

    modal.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(modal);
  },

  data: {
    name: "setreminder",
    description: "Set reminder for yourself or other server members",
  },
};
