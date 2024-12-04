const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Displays information about the server."),

  async execute(interaction) {
    const { guild } = interaction;

    const description = stripIndent`
      **Server Name**: ${guild.name}
      **Server ID**: ${guild.id}
      **Owner**: <@${guild.ownerId}>
      **Created On**: <t:${Math.floor(guild.createdTimestamp / 1000)}:F>
      **Member Count**: ${guild.memberCount}
      **Boost Level**: ${guild.premiumTier}
      **Boosts**: ${guild.premiumSubscriptionCount || "0"}
      **Roles**: ${guild.roles.cache.size}
      **Channels**: ${guild.channels.cache.size}
    `;

    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} - Server Info`)
      .setDescription(description)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor("#7289da")
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig