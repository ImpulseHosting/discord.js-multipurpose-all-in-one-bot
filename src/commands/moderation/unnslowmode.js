const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unslowmode")
    .setDescription("Disables slowmode for the current channel."),
  async execute(interaction) {
    await interaction.channel.setRateLimitPerUser(0).catch((err) => {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription("I couldn't disable slowmode for this channel.");
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    });

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Slowmode Disabled")
      .setDescription("Slowmode has been disabled for this channel.");
    interaction.reply({ embeds: [successEmbed] });
  },
};

// made by manny1_. and ezoig