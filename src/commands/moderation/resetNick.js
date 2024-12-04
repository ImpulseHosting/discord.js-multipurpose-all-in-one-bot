const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetnick")
    .setDescription("Reset a user's nickname.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User whose nickname to reset")
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

    await member.setNickname(null).catch((err) => {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Permission Error")
        .setDescription(
          "I cannot reset this user's nickname. Check my role hierarchy."
        );
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    });

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Nickname Reset")
      .setDescription(`Reset **${user.username}**'s nickname.`);
    interaction.reply({ embeds: [successEmbed] });
  },
};

// made by manny1_. and ezoig