const { Events } = require("discord.js");
const anticaps = require("../database/schemas/anticaps");

module.exports = {
  name: Events.MessageCreate,
  async execute(client, message) {
    if (message.author.bot) return;

    const data = await anticaps.findOne({
      Guild: message.guild.id,
      Channel: message.channel.id,
    });
    if (!data) return;

    var check = false;
    var iteration = 0;
    await data.AllowedUsers.forEach(async (user) => {
      const u = await client.users.fetch(user).catch((err) => {});
      if (u) {
        if (u.id == message.author.id) check = true;
      }
      iteration++;
    });

    while (iteration < data.AllowedUsers.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (check) return;

    const uppercaseChars = await message.content
      .split("")
      .filter((char) => char >= "A" && char <= "Z").length;

    if (
      message.content.length > 0 &&
      uppercaseChars / message.content.length > 0.5 &&
      message.content.length >= 5 // you can change to whatever so if someone does all caps 5 times "AAAAA" it will delete the message
    ) {
      await message.delete().catch((err) => {});
      var msg = await message
        .channel.send({ content: `⚠️ ${message.author} Too many caps!` })
        .catch((err) => {});
      await new Promise((resolve) => setTimeout(resolve, 3000)); // same here you can change to 1000 for it to take 1 second to delete instead off 3
      await msg.delete().catch((err) => {});
    }
  },
};

// made by manny1_. and ezoig