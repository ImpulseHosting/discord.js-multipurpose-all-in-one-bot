const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlocks the current channel."),
  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
        {
          SendMessages: true,
          AddReactions: true,
        }
      );

      const unlockEmbed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("🔓 Channel Unlocked")
        .setDescription(`${channel} is now unlocked.`);
      interaction.reply({ embeds: [unlockEmbed] });
    } catch (err) {
      console.error(err);

      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(
          "Failed to unlock the channel. Please check my permissions."
        );
      interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};

// made by manny1_. and ezoig