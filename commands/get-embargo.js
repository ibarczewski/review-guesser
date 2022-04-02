const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const dateFns = require("date-fns");
const { title } = require("process");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-embargo")
    .setDescription("Gets the embargo for a game")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The name of the game")
        .setRequired(true)
        .addChoice(
          "Weird West",
          "weirdwest|Weird West"
        )
        .addChoice(
          "MLB The Show 22",
          "mlbtheshow22|MLB The Show 22"
        )
        .addChoice(
          "LEGO Star Wars: The Skywalker Saga",
          "legostarwarstheskywalkersaga|LEGO Star Wars: The Skywalker Saga"
        )
    ),
  async execute(interaction) {
    const [filename, gameTitle] = interaction.options
      .getString("game")
      .split("|");


    fs.readFile(`games/${filename}/embargo.csv`, "utf8", (err, data) => {
      if (err) {
        interaction.reply(
          `${gameTitle} either does not have an embargo yet or it has not been entered into the database.`
        );
        return;
      }
      const fileDate = dateFns.parse(data.trim(), "Pp", new Date());
      console.log(fileDate);
      const dateNow = Date.now();
      const remainingTime = dateFns.intervalToDuration({
        end: fileDate,
        start: dateNow,
      });
      interaction.reply(
        `${gameTitle}'s embargo is set for ${dateFns.format(
          fileDate,
          "Pp"
        )}. The embargo will expire ${remainingTime.days} days, ${
          remainingTime.hours
        } hours, and ${remainingTime.minutes} minutes from now.`
      );
    });
  },
};
