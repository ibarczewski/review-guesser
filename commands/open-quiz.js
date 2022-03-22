const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const readline = require("readline");
const { bold } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("open-quiz")
    .setDescription("Quiz test"),
  async execute(interaction) {
    const filestream = fs.createReadStream("quiz/n64/n64.csv");
    const rl = readline.createInterface({
      input: filestream,
      crlfDelay: Infinity,
    });

    const games = [];
    for await (const line of rl) {
      const [title, score] = line.split("|");
      games.push({ title, score });
    }

    const chosenGame = games[getRandomInt(games.length - 1)];

    const filter = (m) => {
      console.log("test", m.content);
      console.log(chosenGame.score);
      return m.content.includes(chosenGame.score);
    };

    interaction.reply(
      `${chosenGame.title} (N64) has a score of __ on Metacritic. Cheat mode ${chosenGame.score}`,
      { fetchReply: true }
    );

    try {
      const channel = await interaction.client.channels.cache.get(
        "955193814753112127"
      );
      const message = await channel.awaitMessages({
        filter,
        max: 1,
        time: 5000,
        errors: ["time"],
      });
      interaction.followUp(`${message.first().author} got the correct answer!`);
    } catch (e) {
      interaction.followUp(
        `Nobody got the right answer. The correct answer was ${bold(
          chosenGame.score
        )}.`
      );
    }
  },
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
