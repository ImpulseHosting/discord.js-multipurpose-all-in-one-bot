const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the guild")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the unban")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Unban User")
            .setDescription("You don't have the `Ban Members` permission!")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    try {
      const bannedUsers = await interaction.guild.bans.fetch();
      const isBanned = bannedUsers.has(user.id);

      if (!isBanned) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Unban User")
              .setDescription(`${user} is **NOT** banned!`)
              .setColor("Red"),
          ],
          ephemeral: true,
        });
      }
      await interaction.guild.members.unban(user.id, reason);

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Unban User")
            .setDescription(`${user} has been unbanned! For: **${reason}**`)
            .setFooter({
              text: `Unbanned by ${interaction.user.tag} | ${interaction.user.id}`,
            })
            .setColor("Green"),
        ],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Unban User")
            .setDescription("An error occurred while trying to unban the user.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }
  },
};

// made by manny1_. and ezoig