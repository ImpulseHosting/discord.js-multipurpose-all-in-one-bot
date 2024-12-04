const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("free-hosting")
    .setDescription("Host your discord bot for free"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("Purple")
      .setAuthor({ name: `ImpulseHost` })
      .setTitle("Free Discord Bot Hosting")
      .setDescription(
        `***__IMPULSE HOST__***\n\nWant the best free discord bot hosting with features such as:\n\n> 🎉 **GIVEAWAYS**\n> 🌍 **ACTIVE COMMUNITY**\n> 📂 **RAPID SERVERS**\n> ✅ **WEEKLY CODES**\n> 🧑🏼 **ACTIVE STAFF**\n\nIf you want all of the above join [impulse hosting](https://discord.gg/impulsehost)`
      )
      .setFooter({ text: `Impulse Host Team` })
      .setThumbnail(
        "https://media.discordapp.net/attachments/1310236822189903882/1310344223874351124/70141a3460f5aa6786e782fe911fcb90.png?ex=6744e0a7&is=67438f27&hm=ca96552c6e736e0a5f9e55fcd7de5b535e93726990e69b19492cbf59bf18a51e&=&format=webp&quality=lossless",
      )
      .setImage(
        "https://media.discordapp.net/attachments/1310236822189903882/1310344224172015767/impulsehostbanner.png?ex=6744e0a8&is=67438f28&hm=d720382c0247e737d31f49ce65dad563b94479a504495f636f1897642c0b50b1&=&format=webp&quality=lossless"
    );

    await interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig