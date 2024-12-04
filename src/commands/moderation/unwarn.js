const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const warnsPath = path.resolve(__dirname, "../../database/warns.json");
let warns = require(warnsPath);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unwarn")
    .setDescription("Removes warnings from a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member whose warnings to remove")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of warnings to remove (default: 1)")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount") || 1;

    if (!warns[user.id] || warns[user.id].length === 0) {
      const noWarningsEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription("This user has no warnings.");
      return interaction.reply({ embeds: [noWarningsEmbed], ephemeral: true });
    }
    const removedWarnings = warns[user.id].splice(0, amount);
    if (warns[user.id].length === 0) delete warns[user.id];

    fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));

    const successEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Warnings Removed")
      .setDescription(
        `Removed **${removedWarnings.length}** warning(s) from **${user.tag}**.`
      );
    interaction.reply({ embeds: [successEmbed] });
  },
};

// made by manny1_. and ezoig