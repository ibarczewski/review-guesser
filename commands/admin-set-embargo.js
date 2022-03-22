const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const dateFns = require("date-fns");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin-set-embargo")
    .setDescription("Guess the score of Ghostwire: Tokyo")
    .addStringOption((choice) =>
      choice
        .setName("date")
        .setDescription("2014-02-11T11:30:30")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = await interaction.client.channels.cache.get(
      "955193814753112127"
    );

    const date = dateFns.parse(
      interaction.options.getString("date"),
      "Pp",
      new Date()
    );
    const dateNow = Date.now();
    console.log(date);
    const remainingTime = dateFns.intervalToDuration({
      end: date,
      start: dateNow,
    });

    fs.writeFile(
      "embargo.csv",
      interaction.options.getString("date"),
      async () => {
        await channel.send(
          `Embargo set for Ghostwire: Tokyo - ${dateFns.format(
            date,
            "Pp"
          )}. The embargo will expire ${remainingTime.days} days, ${
            remainingTime.hours
          } hours, and ${remainingTime.minutes} minutes from now.`
        );
      }
    );
  },
};
