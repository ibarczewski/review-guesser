var fs = require("fs");
var readline = require("readline");
var lineReplace = require("line-replace");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    console.log(message.channel.type);
    if (message.channel.type !== "DM" || message.author.bot) {
      return;
    }

    const channel = await message.client.channels.cache.get(
      "955193814753112127"
    );

    const user = await channel.guild.members.fetch({
      user: message.author,
      force: true,
    });

    fs.appendFile(
      "ghostwire.csv",
      `${user.nickname || user.username},${message.content}`,
      async () => {
        await message.author.send("Bot DMed. Tell Ian to stop doing this.");
      }
    );
  },
};
