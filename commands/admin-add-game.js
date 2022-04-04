import { SlashCommandBuilder } from "@discordjs/builders";

const adminAddGame = {
  data: new SlashCommandBuilder()
    .setName("admin-add-game")
    .setDescription("Add a game to the database"),
  // .addStringOption((option) =>
  //   option
  //     .setName("gameName")
  //     .setDescription("The proper game title")
  //     .setRequired(true))
  // .addStringOption((option) =>
  //   option
  //     .setName("filename")
  //     .setDescription("The database file name")
  //     .setRequired(true))
  // .addStringOption((option) =>
  //   option
  //     .setName("embargoDate")
  //     .setDescription("The embargo date, formatted")
  //     .setRequired(false))
  async execute(interaction) {
    if (interaction.user.id !== "133783258071695360") {
      await interaction.reply(
        "Don't try that you dummy. Only Ian can do that."
      );
      return;
    } else {
      await interaction.reply("Hi, Ian.");
      return;
    }
  },
};

export default adminAddGame;
