const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("steal")
    .setDescription("Attempt to steal coins from another user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to steal from.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const targetUser = interaction.options.getUser("target");

    if (userId === targetUser.id) {
      return interaction.reply({
        content: "You can't steal from yourself!",
        ephemeral: true,
      });
    }

    const user = await User.findOne({ userId });
    const target = await User.findOne({ userId: targetUser.id });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    if (!target) {
      return interaction.reply({
        content: `${targetUser.username} does not have an account.`,
        ephemeral: true,
      });
    }

    if (target.coins <= 0) {
      return interaction.reply({
        content: `${targetUser.username} has no coins to steal.`,
        ephemeral: true,
      });
    }

    const successRate = Math.random();
    let amount = 0;
    let response = "";

    if (successRate < 0.5) {
      amount = Math.floor(Math.random() * target.coins * 0.2) + 1;
      target.coins -= amount;
      user.coins += amount;
      await target.save();
      await user.save();

      response = `You successfully stole **${amount} coins** from ${targetUser.username}!`;
    } else {
      response = `You failed to steal coins from ${targetUser.username} and got caught!`;
    }

    const embed = new EmbedBuilder()
      .setTitle("Stealing Results")
      .setColor("#FF6347")
      .setDescription(response)
      .setFooter({
        text: `Your balance: ${user.coins} coins`,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig