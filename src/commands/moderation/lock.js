const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks the current channel."),
  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
        {
          SendMessages: false,
          AddReactions: false,
        }
      );

      const lockEmbed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle("🔒 Channel Locked")
        .setDescription(`${channel} is now locked.`);
      interaction.reply({ embeds: [lockEmbed] });
    } catch (err) {
      console.error(err);

      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(
          "Failed to lock the channel. Please check my permissions."
        );
      interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};

// made by manny1_. and ezoig