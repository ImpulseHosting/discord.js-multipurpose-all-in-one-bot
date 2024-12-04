const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Deletes a specified number of messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete (1-100)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Invalid Amount")
        .setDescription("Please provide a number between **1 and 100**.");
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    await interaction.channel.bulkDelete(amount, true).catch((err) => {
      const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(
          "Failed to delete messages. Ensure I have the required permissions."
        );
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    });

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Purge Successful")
      .setDescription(`Deleted **${amount}** messages.`);
    interaction.reply({ embeds: [successEmbed], ephemeral: true });
  },
};

// made by manny1_. and ezoig