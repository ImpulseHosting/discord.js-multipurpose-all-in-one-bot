const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Removes a role from a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to remove the role from")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to remove")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");
    const member = await interaction.guild.members.fetch(user.id);

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Remove Role")
            .setDescription("You don't have permission to manage roles!")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    if (interaction.member.roles.highest.position <= role.position) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Remove Role")
            .setDescription(
              "You cannot remove a role that is equal to or higher than your highest role!"
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    try {
      await member.roles.remove(role);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Remove Role")
            .setDescription(
              `Successfully removed the role ${role} from ${user}.`
            )
            .setColor("Green"),
        ],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Remove Role")
            .setDescription("An error occurred while removing the role.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }
  },
};

// made by manny1_. and ezoig