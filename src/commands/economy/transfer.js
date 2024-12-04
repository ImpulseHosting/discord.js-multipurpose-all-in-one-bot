const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("Transfer coins between storage types.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount to transfer")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of storage to transfer to")
        .setRequired(true)
        .addChoices(
          { name: "Bank", value: "bank" },
          { name: "Safe", value: "safe" },
          { name: "Vault", value: "vault" }
        )
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    const amount = interaction.options.getInteger("amount");
    const type = interaction.options.getString("type");

    if (amount <= 0 || amount > user.coins) {
      return interaction.reply({
        content: "You don't have enough coins to transfer.",
        ephemeral: true,
      });
    }

    user.coins -= amount;

    if (type === "bank") {
      user.bank += amount;
    } else if (type === "safe") {
      user.safe += amount;
    } else if (type === "vault") {
      user.vault += amount;
    }

    await user.save();

    const embed = new EmbedBuilder()
      .setTitle("Transfer Successful")
      .setColor("#00FF00")
      .setDescription(
        `You have transferred \`${amount}\` coins to your ${type}.`
      )
      .setFooter({
        text: "Transfer Success",
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig