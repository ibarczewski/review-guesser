var fs = require("fs");

module.exports = {
  name: "message",
  async execute(message) {
    console.log("hi", message.channel.type);
    if (message.channel.type !== "DM" || message.author.bot) {
      return;
    }

    const channel = await message.client.channels.cache.get(
      "955193814753112127"
    );
  },
};
