const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inviteinfo")
    .setDescription("Gets information about a Discord invite link.")
    .addStringOption((option) =>
      option
        .setName("invite")
        .setDescription("The invite link or code to inspect.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const inviteCode = interaction.options
      .getString("invite")
      .replace("https://discord.gg/", "");
    try {
      const invite = await interaction.client.fetchInvite(inviteCode);

      const description = stripIndent`
        **Server Name**: ${invite.guild.name}
        **Server ID**: ${invite.guild.id}
        **Invite Code**: ${invite.code}
        **Channel**: ${invite.channel.name} (${invite.channel.type})
        **Inviter**: ${invite.inviter ? invite.inviter.tag : "Unknown"}
        **Uses**: ${invite.uses || "Unknown"} / ${invite.maxUses || "Unlimited"}
        **Expires**: ${
          invite.expiresAt
            ? `<t:${Math.floor(invite.expiresAt / 1000)}:F>`
            : "Never"
        }
      `;

      const embed = new EmbedBuilder()
        .setTitle("Invite Information")
        .setDescription(description)
        .setColor("#7289da")
        .setThumbnail(invite.guild.iconURL({ dynamic: true }))
        .setFooter({
          text: "Invite Info",
          iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Invalid or expired invite link.",
        ephemeral: true,
      });
    }
  },
};

// made by manny1_. and ezoig