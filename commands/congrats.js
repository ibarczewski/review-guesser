const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("congrats")
    .setDescription("Gives congrats to the most recent winner"),
  async execute(interaction) {
    await interaction.reply("🎉 Congrats Sudowoodo45! 🎉");
  },
};
