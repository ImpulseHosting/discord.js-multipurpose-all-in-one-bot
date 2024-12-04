const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the guild")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick")
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
            .setTitle("Kick User")
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
            .setTitle("Kick User")
            .setDescription(`${user} has a role higher than yours!`)
            .setColor("Red"),
        ],
      });
    }
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Kick User")
            .setDescription("You don't have the `Kick Members` permission!")
            .setColor("Red"),
        ],
      });
    } else {
      await member.kick();
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Kick User")
            .setDescription(`${user} has been kicked! For: **${reason}**`)
            .setFooter({
              text: `Kicked by ${interaction.user.tag} | ${interaction.user.id}`,
            })
            .setColor("Green"),
        ],
      });
    }
  },
};

// made by manny1_. and ezoig