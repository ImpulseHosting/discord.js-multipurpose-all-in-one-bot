const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamble")
    .setDescription("Gamble your life saving!")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount to gamble.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger("amount");

    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    if (amount > user.coins) {
      return interaction.reply({
        content: "Please enter a positive amount",
        ephemeral: true,
      });
    }

    const cooldownKey = `gamble_${userId}`;
    const cooldown = interaction.client.cooldowns.get(cooldownKey);
    if (cooldown && cooldown > Date.now()) {
      const timeLeft = Math.ceil((cooldown - Date.now()) / 1000);
      return interaction.reply({
        content: `You need to wait ${timeLeft} seconds to gamble again`,
        ephemeral: true,
      });
    }

    const jackpotRate = Math.random();
    let jackpot = false;

    if (jackpotRate < 0.01) {
      jackpot = true;
    }

    const jackpotResponse = `You hit the 👑 ***JACKPOT*** 👑! You gambled **${amount} coins** and won **${
      amount * 10
    } coins**! 🎉`;

    const winResponses = [
      `You gamble **${amount} coins** and won **${amount * 2} coins**!`,
      `After hours in the casino you finally won **${amount * 2} coins!**`,
      `A magic machine told you to gamble so you took the chances and won **${
        amount * 2
      } coins!**`,
    ];

    const loseResponses = [
      `You gambled **${amount} coins** and lost! Better luck next time.`,
      `Unfortunately, you gambled **${amount} coins** and lost. Try again!`,
      `You gambled **${amount} coins** and lost everything. Don't give up!`,
    ];

    let result = "";
    let winnings = 0;

    if (jackpot) {
      winnings = amount * 10;
      user.coins += winnings;
      result = jackpotResponse;
    } else {
      const winRate = Math.random();
      if (winRate < 0.5) {
        user.coins -= amount;
        result =
          loseResponses[Math.floor(Math.random() * loseResponses.length)];
      } else {
        winnings = amount * 2;
        user.coins += winnings;
        result = winResponses[Math.floor(Math.random() * winResponses.length)];
      }
    }

    await user.save();

    const embed = new EmbedBuilder()
      .setTitle("Gambling Results")
      .setColor(winnings > 0 ? "#FFD700" : "#FF0000")
      .setDescription(result)
      .setFooter({
        text: `Your balance: ${user.coins} coins`,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    interaction.client.cooldowns.set(cooldownKey, Date.now() + 10 * 60 * 1000);

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig