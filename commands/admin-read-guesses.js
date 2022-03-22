const { SlashCommandBuilder } = require("@discordjs/builders");
const { bold, italic } = require("@discordjs/builders");
const fs = require("fs");
const readline = require("readline");
const title = "Ghostwire: Tokyo";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin-read-guesses")
    .setDescription("Get guesses for current voted game"),
  async execute(interaction) {
    const filestream = fs.createReadStream("ghostwire.csv");
    const rl = readline.createInterface({
      input: filestream,
      crlfDelay: Infinity,
    });

    let guesses = bold("Guesses for Ghostwire: Tokyo: \n\n");
    for await (const line of rl) {
      guesses += line.replace(",", ", ") + "\n";
    }

    await interaction.reply(guesses);
  },
};
