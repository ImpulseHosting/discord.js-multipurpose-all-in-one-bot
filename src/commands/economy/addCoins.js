const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-coins")
    .setDescription("Admin command to add coins to a user's wallet.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to add coins to.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of coins to add.")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    const targetUser = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (amount <= 0) {
      return interaction.reply({
        content: "Please provide a valid positive amount to add.",
        ephemeral: true,
      });
    }

    const user = await User.findOne({ userId: targetUser.id });

    if (!user) {
      return interaction.reply({
        content: `${targetUser.username} does not have an account.`,
        ephemeral: true,
      });
    }

    user.coins += amount;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle("Admin: Add coins")
      .setColor("#00FF00")
      .setDescription(
        `Successfully added **${amount} coins** to **${targetUser.username}'s** wallet.`
      )
      .setFooter({
        text: `Updated balance: ${user.coins} coins`,
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig