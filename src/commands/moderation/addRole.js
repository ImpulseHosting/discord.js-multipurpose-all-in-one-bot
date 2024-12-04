const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Adds a role to a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to add the role to")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("The role to add").setRequired(true)
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
            .setTitle("Add Role")
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
            .setTitle("Add Role")
            .setDescription(
              "You cannot add a role that is equal to or higher than your highest role!"
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    try {
      await member.roles.add(role);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Add Role")
            .setDescription(`Successfully added the role ${role} to ${user}.`)
            .setColor("Green"),
        ],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Add Role")
            .setDescription("An error occurred while adding the role.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }
  },
};

// made by manny1_. and ezoig