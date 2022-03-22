const { SlashCommandBuilder, hideLinkEmbed } = require("@discordjs/builders");
const { italic, bold } = require("@discordjs/builders");

const title = "Elden Hearts IV: Re-CoDeD Dynamix DreamDropDistance";
const openCritic = hideLinkEmbed("http://www.google.com/");
const metaCritic = hideLinkEmbed("http://www.yahoo.com/");
const metaCriticXbox = hideLinkEmbed("http://www.goodreads.com/");
const metaCriticSwitch = hideLinkEmbed("http://www.letterboxd.com/");

const pages = [openCritic, metaCritic, metaCriticXbox, metaCriticSwitch];

const embargoInfo = `${italic(title)}'s embargo has lifted! \n${bold(
  "OpenCritic:"
)} ${openCritic} \n${bold("Metacritic:")} ${metaCritic}`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("example-embargo-lift")
    .setDescription("Replies with an example embargo release date and time"),
  async execute(interaction) {
    await interaction.reply(embargoInfo);
  },
};
