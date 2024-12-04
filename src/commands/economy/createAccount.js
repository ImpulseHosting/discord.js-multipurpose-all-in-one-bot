const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-account")
    .setDescription("Create an account."),

  async execute(interaction) {
    const userId = interaction.user.id;
    console.log(`Attempting to create account for user ID: ${userId}`);
    let user = await User.findOne({ userId });
    if (user) {
      console.log(`User with ID: ${userId} already has an account.`);
      return interaction.reply({
        content: "You already have an account!",
        ephemeral: true,
      });
    }

    user = new User({ userId, coins: 250 });
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle("Account Created")
      .setColor("00FF00")
      .setDescription(
        "Your account has been created, and you have been given 250 coins to start off!"
      )
      .setFooter({
        text: "Account Creation",
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      });

    console.log(`Account for user ${userId} created successfully.`);

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig