const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin-test")
    .setDescription("Tests to see if user permissions are valid"),
  async execute(interaction) {
    try {
      if (
        interaction.guild
          .member(interaction.user.id)
          .permissions.has("ADMINISTRATOR")
      ) {
        await interaction.reply("Admin");
      } else {
        await interaction.reply("Not Admin");
      }
    } catch (e) {
      await interaction.reply(`An error occurred: ${e.message}`);
    }
  },
};
