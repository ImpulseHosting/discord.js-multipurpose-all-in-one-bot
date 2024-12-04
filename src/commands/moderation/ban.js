const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the guild")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ban User")
            .setDescription(`${user} is **NOT** in the guild!`)
            .setColor("Red"),
        ],
      });
    }
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ban User")
            .setDescription(`${user} has a role higher than yours!`)
            .setColor("Red"),
        ],
      });
    }
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ban User")
            .setDescription("You don't have the `Ban Members` permission!")
            .setColor("Red"),
        ],
      });
    } else {
      await member.ban({ reason: reason });
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ban User")
            .setDescription(`${user} has been banned! For: **${reason}**`)
            .setFooter({
                text: `Banned by ${interaction.user.tag} | ${interaction.user.id}`
              })
            .setColor("Green"),
        ],
      });
    }
  },
};

// made by manny1_. and ezoig