const { SlashCommandBuilder } = require("@discordjs/builders");
const { bold, italic } = require("@discordjs/builders");
const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin-add-game")
    .setDescription("Add a game to the database")
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
    ,
  async execute(interaction) {
    if (interaction.user.id !== "133783258071695360") {
      await interaction.reply("Don't try that you dummy. Only Ian can do that.");
      return;
    } else {
      await interaction.reply("Hi, Ian.");
      return;
    }

    // const filestream = fs.createReadStream("ghostwire.csv");
    // const rl = readline.createInterface({
    //   input: filestream,
    //   crlfDelay: Infinity,
    // });

    // const fakeResult = interaction.options.getInteger("score") || 83;

    // let guesses = [];
    // for await (const line of rl) {
    //   const data = line.split(",");
    //   guesses.push({
    //     name: data[0],
    //     guess: data[1],
    //     result: Math.abs(parseInt(data[1]) - fakeResult),
    //     trueResult: parseInt(data[1] - fakeResult),
    //   });
    // }

    // const sortedGuesses = _.sortBy(guesses, "result");
    // const mappedGuesses = sortedGuesses.reduce(
    //   (prev, curr, index) =>
    //     `${prev}\n${index + 1}) ${index === 0 ? "👑" : ""} ${bold(curr.name)} ${
    //       index === 0 ? "👑" : ""
    //     }, ${curr.guess}, ${curr.trueResult}${
    //       curr.trueResult === 0 ? ` - 🎉 ${bold("PERFECT GUESS")} 🎉` : ""
    //     }`,
    //   ""
    // );

    // const embargoScore = `After eight hours, ${italic(
    //   title
    // )} has a score of ${fakeResult} on Metacritic.\n\nResults (Name, Score, Delta):
    // ${mappedGuesses}`;

    // await interaction.reply(embargoScore);
  },
};
