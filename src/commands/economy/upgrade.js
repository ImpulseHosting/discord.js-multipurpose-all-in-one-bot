const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upgrade")
    .setDescription("Upgrade your bank, safe, or vault capacity.")
    .addStringOption((option) =>
      option
        .setName("storage")
        .setDescription("Storage to upgrade (bank, safe, vault).")
        .setRequired(true)
        .addChoices(
          { name: "Bank", value: "bank" },
          { name: "Safe", value: "safe" },
          { name: "Vault", value: "vault" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("level")
        .setDescription("Upgrade level (1-10).")
        .setRequired(true)
        .addChoices(
          { name: "Level 1", value: 1 },
          { name: "Level 2", value: 2 },
          { name: "Level 3", value: 3 },
          { name: "Level 4", value: 4 },
          { name: "Level 5", value: 5 },
          { name: "Level 6", value: 6 },
          { name: "Level 7", value: 7 },
          { name: "Level 8", value: 8 },
          { name: "Level 9", value: 9 },
          { name: "Level 10", value: 10 }
        )
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const storageType = interaction.options.getString("storage");
    const level = interaction.options.getInteger("level");

    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    const currentCapacity = user[`${storageType}Capacity`];
    const maxLevel = 10;
    const upgradeCost = level * 10000;
    const upgradeAmount = level * 10000;

    if (level > maxLevel) {
      return interaction.reply({
        content: "You cannot upgrade beyond level 10.",
        ephemeral: true,
      });
    }

    if (user.coins < upgradeCost) {
      return interaction.reply({
        content: "You do not have enough coins to upgrade.",
        ephemeral: true,
      });
    }
    user.coins -= upgradeCost;
    user[`${storageType}Capacity`] += upgradeAmount;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Storage Upgrade`)
      .setColor("#FFD700")
      .setDescription(
        `You have successfully upgraded your **${storageType}** to level **${level}** by **${upgradeAmount}** coins!`
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