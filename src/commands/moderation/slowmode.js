const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Sets slowmode for the current channel.")
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Duration in seconds (0 to disable)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const time = interaction.options.getInteger("time");

    try {
      await interaction.channel.setRateLimitPerUser(time);

      const slowmodeEmbed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle("⏳ Slowmode Updated")
        .setDescription(
          time === 0
            ? "Slowmode has been disabled."
            : `Slowmode is now set to **${time} seconds**.`
        );

      if (interaction.replied || interaction.deferred) {
        return interaction.followUp({ embeds: [slowmodeEmbed] });
      } else {
        return interaction.reply({ embeds: [slowmodeEmbed] });
      }
    } catch (err) {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(
          "I couldn't set the slowmode for this channel\n\nMax usage:\n> 5 seconds = 5\n> 10 seconds = 10\n> 15 seconds = 15\n> 30 seconds = 30\n> 1 minute = 60\n> 2 minutes = 120\n> 5 minutes = 300\n> 10 minutes = 600\n> 15 minutes = 900\n> 30 minutes = 1800\n> 1 hour = 3600\n> 2 hours = 7200\n> 6 hours = 21600"
        );

      if (interaction.replied || interaction.deferred) {
        return interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  },
};

// made by manny1_. and ezoig