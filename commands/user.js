const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with User!"),
  async execute(interaction) {
    await interaction.reply("User!");
  },
};
