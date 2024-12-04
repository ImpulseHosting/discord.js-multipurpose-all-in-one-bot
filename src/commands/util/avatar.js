const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Displays a user's avatar.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to get the avatar of.")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const avatarURL = user.displayAvatarURL({ size: 1024, dynamic: true });

    const avatarEmbed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(
        stripIndent`
        **User:** ${user.tag}
        **ID:** ${user.id}
      `
      )
      .setImage(avatarURL)
      .setColor("#7289da")
      .setFooter({ text: "Avatar", iconURL: avatarURL })
      .setTimestamp();

    await interaction.reply({ embeds: [avatarEmbed] });
  },
};

// made by manny1_. and ezoig