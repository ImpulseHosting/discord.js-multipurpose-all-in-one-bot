const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wallet")
    .setDescription("Shows your wallet, bank, safe, and vault balances"),

  async execute(interaction) {
    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }
    const {
      coins,
      bank,
      safe,
      vault,
      bankCapacity,
      safeCapacity,
      vaultCapacity,
    } = user;

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Wallet`)
      .setColor("#7289da")
      .setDescription(
        `
          **Coins**: ${coins}
          **Bank**: \`${bank}/${bankCapacity}\`
          **Safe**: \`${safe}/${safeCapacity}\`
          **Vault**: \`${vault}/${vaultCapacity}\`
        `
      )
      .setFooter({
        text: "Your Wallet",
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig