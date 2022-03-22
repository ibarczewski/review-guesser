const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const dateFns = require("date-fns");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-embargo")
    .setDescription("Gets the embargo for a game")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The name of the game")
        .setRequired(true)
        .addChoice("Ghostwire: Tokyo", "Ghostwire-Tokyo")
    ),
  async execute(interaction) {
    fs.readFile("games/kirby/embargo.csv", "utf8", (err, data) => {
      if (err) {
        interaction.reply(
          "Kirby and the Forgotten Land does not have a public embargo date yet."
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
        `Ghostwire: Tokyo's embargo is set for ${dateFns.format(
          fileDate,
          "Pp"
        )}. The embargo will expire ${remainingTime.days} days, ${
          remainingTime.hours
        } hours, and ${remainingTime.minutes} minutes from now.`
      );
    });
  },
};
