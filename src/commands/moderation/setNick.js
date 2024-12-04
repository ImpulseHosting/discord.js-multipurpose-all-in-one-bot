const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setnick")
    .setDescription("Change the nickname of a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User whose nickname to change")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("The new nickname")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const nickname = interaction.options.getString("nickname");
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription("User not found in the server.");
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    await member.setNickname(nickname).catch((err) => {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Permission Error")
        .setDescription(
          "I cannot change this user's nickname. Check my role hierarchy."
        );
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    });

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Nickname Updated")
      .setDescription(
        `Changed **${user.username}**'s nickname to **${nickname}**.`
      );
    interaction.reply({ embeds: [successEmbed] });
  },
};

// made by manny1_. and ezoig