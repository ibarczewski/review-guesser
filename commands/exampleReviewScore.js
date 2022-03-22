const { SlashCommandBuilder } = require("@discordjs/builders");
const { bold, italic } = require("@discordjs/builders");

const title = "Elden Hearts IV: Re-CoDeD Dynamix DreamDropDistance";
const embargoScore = `After eight hours, ${italic(
  title
)} has a score of 82 on Metacritic.

Results (Name, Score, Delta):

1) 👑 ${bold("Ian")} 👑, 82, 0 - 🎉 ${bold("PERFECT GUESS")} 🎉
2) ${bold("IanClone")}, 84, +2
3) ${bold("IanClone2")}, 79, -3`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("example-review-score")
    .setDescription("Replies with an example review-score"),
  async execute(interaction) {
    await interaction.reply(embargoScore);
  },
};
