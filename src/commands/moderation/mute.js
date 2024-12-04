const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes a member in the server.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to mute")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("length")
        .setDescription("Duration for mute in minutes")
        .setRequired(true)
        .setMinValue(1)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for muting")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const length = interaction.options.getInteger("length");
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription("User not found in the server.");
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    const timeoutDuration = length * 60 * 1000;

    await member.timeout(timeoutDuration, reason).catch((err) => {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(
          "I cannot mute this user. Ensure I have the required permissions."
        );
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    });

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Member Muted")
      .setDescription(
        `Muted **${user.tag}** for **${length} minute(s)** due to: **${reason}**.`
      );
    interaction.reply({ embeds: [successEmbed] });
  },
};

// made by manny1_. and ezoig