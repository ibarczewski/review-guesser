const { SlashCommandBuilder } = require("@discordjs/builders");
const { bold, italic } = require("@discordjs/builders");

const title = "Elden Hearts IV: Re-CoDeD Dynamix DreamDropDistance";
const fakeDate = "Tuesday, May 5th, 2021 at 07:00 AM PDT";
const embargoInfo = `${italic(title)}'s embargo lifts on ${bold(fakeDate)}.`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exampleembargo")
    .setDescription("Replies with an example embargo release date and time"),
  async execute(interaction) {
    await interaction.reply(embargoInfo);
  },
};
