const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");
const dailyCooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Collect your daily rewards"),

  async execute(interaction) {
    const userId = interaction.user.id;

    const now = Date.now();
    const cooldownAmount = 24 * 60 * 60 * 1000;

    if (dailyCooldowns.has(userId)) {
      const expirationTime = dailyCooldowns.get(userId) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = Math.ceil((expirationTime - now) / 1000 / 60 / 60);
        return interaction.reply({
          content: `You already claimed your daily rewards. Try again in ${timeLeft} hours.`,
          ephemeral: true,
        });
      }
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    const dailyReward = Math.floor(Math.random() * 500) + 100;
    user.coins += dailyReward;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle("Daily Reward")
      .setColor("#00FF00")
      .setDescription(
        `You claimed your daily reward of **${dailyReward} coins**!`
      )
      .setFooter({
        text: `Your balance: ${user.coins} coins`,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    dailyCooldowns.set(userId, now);
    setTimeout(() => dailyCooldowns.delete(userId), cooldownAmount);

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig