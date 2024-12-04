const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit coins into your bank, safe, or vault.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of coins to deposit.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("storage")
        .setDescription("The storage to deposit into (bank, safe, vault).")
        .setRequired(true)
        .addChoices(
          { name: "Bank", value: "bank" },
          { name: "Safe", value: "safe" },
          { name: "Vault", value: "vault" }
        )
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger("amount");
    const storageType = interaction.options.getString("storage");

    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    if (amount <= 0) {
      return interaction.reply({
        content: "Please deposit a positive amount.",
        ephemeral: true,
      });
    }

    if (amount > user.coins) {
      return interaction.reply({
        content: "You do not have enough coins to deposit that amount.",
        ephemeral: true,
      });
    }

    const storageCapacityKey = `${storageType}Capacity`;
    const currentStorageKey = storageType;

    if (user[currentStorageKey] + amount > user[storageCapacityKey]) {
      return interaction.reply({
        content: `You cannot deposit more than your ${storageType} capacity. Current ${storageType} capacity: ${user[storageCapacityKey]}`,
        ephemeral: true,
      });
    }
    user[currentStorageKey] += amount;
    user.coins -= amount;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Deposit`)
      .setColor("#32CD32")
      .setDescription(
        `You successfully deposited **${amount} coins** into your **${storageType}**.`
      )
      .setFooter({
        text: `Your balance: ${user.coins} coins`,
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig