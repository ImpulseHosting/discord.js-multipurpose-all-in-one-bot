const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const warnsPath = path.resolve(__dirname, "../../database/warns.json");
let warns = {};

if (fs.existsSync(warnsPath)) {
  try {
    warns = JSON.parse(fs.readFileSync(warnsPath, "utf-8"));
  } catch (error) {
    console.error("Warns file is empty...");
    warns = {};
    fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));
  }
} else {
  console.warn("Warns file not found. Creating a new one...");
  fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to warn")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the warning")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (!warns[user.id]) warns[user.id] = [];
    warns[user.id].push(reason);

    fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));

    const warnEmbed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("⚠️ Warning Issued")
      .setDescription(`Warned **${user.tag}** for: **${reason}**.`);
    interaction.reply({ embeds: [warnEmbed] });
  },
};

// made by manny1_. and ezoig