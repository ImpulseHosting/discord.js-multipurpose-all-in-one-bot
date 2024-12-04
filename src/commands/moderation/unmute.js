const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a member in the server.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to unmute")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription("User not found in the server.");
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    await member.timeout(null).catch((err) => {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(
          "I cannot unmute this user. Ensure I have the required permissions."
        );
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    });

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Member Unmuted")
      .setDescription(`Unmuted **${user.tag}**.`);
    interaction.reply({ embeds: [successEmbed] });
  },
};

// made by manny1_. and ezoig