const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays MongoDB and Bot response times."),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      let mongooseLatency;
      try {
        const startMongoose = process.hrtime.bigint();
        await mongoose.connection.db.admin().ping();
        const endMongoose = process.hrtime.bigint();
        mongooseLatency = Number(endMongoose - startMongoose) / 1e6;
      } catch (err) {
        mongooseLatency = "Error";
      }
      const botPing = interaction.client.ws.ping;

      const embed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle("Ping Information")
        .addFields(
          {
            name: "MongoDB Ping",
            value: `\`\`\`${mongooseLatency}ms\`\`\``,
            inline: true,
          },
          {
            name: "Bot Ping (WebSocket)",
            value: `\`\`\`${botPing}ms\`\`\``,
            inline: true,
          }
        )
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in ping command:", error);
      await interaction.editReply({
        content: `Error fetching ping: ${error.message}`,
        ephemeral: true,
      });
    }
  },
};

// made by manny1_. and ezoig