const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const warns = require("../../database/warns.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("Lists all warnings for a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member whose warnings to view")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const userWarnings = warns[user.id] || [];

    const warningsEmbed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle(`⚠️ Warnings for ${user.tag}`)
      .setDescription(
        userWarnings.length
          ? `Total Warnings: **${userWarnings.length}**\n\n` +
            userWarnings
              .map((reason, index) => `**${index + 1}.** ${reason}`)
              .join("\n")
          : "This user has no warnings."
      );

    interaction.reply({ embeds: [warningsEmbed] });
  },
};

// made by manny1_. and ezoig