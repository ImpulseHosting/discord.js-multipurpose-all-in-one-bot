const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("password")
    .setDescription("Generate a secure random password.")
    .addIntegerOption((option) =>
      option
        .setName("length")
        .setDescription("The length of the password (default: 12).")
        .setMinValue(6)
        .setMaxValue(64)
    )
    .addBooleanOption((option) =>
      option
        .setName("special")
        .setDescription("Include special characters? (default: true)")
    ),
  async execute(interaction) {
    const length = interaction.options.getInteger("length") || 12;
    const includeSpecial = interaction.options.getBoolean("special") ?? true;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const pool = includeSpecial ? chars + specialChars : chars;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += pool.charAt(Math.floor(Math.random() * pool.length));
    }

    await interaction.reply(`🔑 **Your random password:** \`${password}\``);
  },
};

// made by manny1_. and ezoig