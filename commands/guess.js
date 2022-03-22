const { SlashCommandBuilder } = require("@discordjs/builders");
const { bold, italic } = require("@discordjs/builders");
const fs = require("fs");
const lineReplace = require("line-replace");
const readline = require("readline");
const title = "Ghostwire: Tokyo";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guess")
    .setDescription("Guess the score of a game")
    .addStringOption((choice) =>
      choice
        .setName("game")
        .setDescription("The game you want to guess the score of")
        .setRequired(true)
        .addChoice(
          "Kirby and the Forgotten Land",
          "kirbyandtheforgottenland|Kirby and the Forgotten Land"
        )
        .addChoice(
          "Tiny Tina's Wonderlands",
          "tinytinaswonderlands|Tiny Tina's"
        )
    )
    .addIntegerOption((choice) =>
      choice
        .setName("score")
        .setDescription("Your guess of the Metacritic Score")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = await interaction.client.channels.cache.get(
      "955193814753112127"
    );

    const user = await channel.guild.members.fetch({
      user: interaction.user,
      force: true,
    });

    // const filestream = fs.createReadStream(`${interaction.options.getString('game')}.csv`);
    // const rl = readline.createInterface({
    //   input: filestream,
    //   crlfDelay: Infinity,
    // });

    // let index = 0;
    // let found = false;
    // let foundIndex = 0;

    // for await (const line of rl) {
    //   if (line.includes(user.nickname) || line.includes(user.username)) {
    //     found = true;
    //     foundIndex = index;
    //   }

    //   index++;
    // }

    // if (found) {
    //   lineReplace({
    //     file: "ghostwire.csv",
    //     line: foundIndex + 1,
    //     text: "",
    //     addNewLine: false,
    //     callback: () => {},
    //   });
    // }

    const [filename, gameTitle] = interaction.options
      .getString("game")
      .split("|");

    fs.mkdir(`games/${filename}`, { recursive: true }, (err, path) => {
      fs.appendFile(
        `./games/${filename}/score.csv`,
        `${
          user.nickname ?? user.user.username
        },${interaction.options.getInteger("score")}\n`,
        async () => {
          await interaction.reply(
            `${
              user.nickname ?? user.user.username
            } has registered their guess for ${gameTitle}!`
          );
        }
      );
    });
  },
};
