import { SlashCommandBuilder } from "@discordjs/builders";
import { bold } from "@discordjs/builders";
import fs from "fs";
import readline from "readline";
import * as _ from "lodash";

export default {
  data: new SlashCommandBuilder()
    .setName("admin-force-results")
    .setDescription("Get fake results")
    .addIntegerOption((option) =>
      option
        .setName("score")
        .setDescription("The score of the game")
        .setRequired(false)
    ),
  async execute(interaction) {
    if (interaction.user.id !== "133783258071695360") {
      await interaction.reply(
        "Don't try that you dummy. Only Ian can do that."
      );
      return;
    } else {
      const filestream = fs.createReadStream("./games/weirdwest/score.csv");
      const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
      });

      const fakeResult = interaction.options.getInteger("score") || 83;

      let guesses = [];
      for await (const line of rl) {
        const data = line.split(",");
        guesses.push({
          name: data[0],
          guess: data[1],
          result: Math.abs(parseInt(data[1]) - fakeResult),
          trueResult: parseInt(data[1] - fakeResult),
        });
      }

      const sortedGuesses = _.sortBy(guesses, "result");
      const mappedGuesses = sortedGuesses.reduce(
        (prev, curr, index) =>
          `${prev}\n${index + 1}) ${index === 0 ? "👑" : ""} ${bold(
            curr.name
          )} ${index === 0 ? "👑" : ""}, ${curr.guess}, ${curr.trueResult}${
            curr.trueResult === 0 ? ` - 🎉 ${bold("PERFECT GUESS")} 🎉` : ""
          }`,
        ""
      );

      const embargoScore = `After eight hours, Weird West has a score of ${fakeResult} on Metacritic.\n\nResults (Name, Score, Delta):
      ${mappedGuesses}`;

      await interaction.reply(embargoScore);
      return;
    }
  },
};
