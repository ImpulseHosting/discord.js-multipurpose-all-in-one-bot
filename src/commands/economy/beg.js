const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for coins!"),

  async execute(interaction) {
    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    const cooldownKey = `beg_${userId}`;
    const cooldown = interaction.client.cooldowns.get(cooldownKey);

    if (cooldown && cooldown > Date.now()) {
      const timeLeft = Math.ceil((cooldown - Date.now()) / 1000);
      return interaction.reply({
        content: `You need to wait $${timeLeft} seconds before begging again.`,
        ephemeral: true,
      });
    }

    const successResponses = [
      "You begged for hours until a kind stranger gave you **{amount}** coins!",
      "You found **{amount}** coins on the floor.",
      "A generous donor handed you **{amount}** coins!",
      'You held up a sign saying "Homeless father with 5 kids" and got **{amount}** coins!',
      "A homeless man gave you **{amount}** coins. | (it was all he had)",
      "You encountered Elon Musk and he gave you **{amount}** coins!",
    ];

    const faildResponses = [
      "No one was kind enough to give you coins.",
      "You begged for hours, but everyone ignored you.",
      "You found nothing but empty pockets.",
      "You asked a rich man but he told you to get lost!",
    ];

    const successRate = Math.random();
    let amount = 0;
    let response = "";

    if (successRate < 0.5) {
      amount = Math.floor(Math.random() * 50) + 1;
      response = successResponses[
        Math.floor(Math.random() * successResponses.length)
      ].replace("{amount}", amount);
    } else {
      response =
        faildResponses[Math.floor(Math.random() * faildResponses.length)];
    }

    user.coins += amount;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle("Begging Results")
      .setColor(amount > 0 ? "#00FF00" : "#FF0000")
      .setDescription(response)
      .setFooter({
        text: `Your balance: ${user.coins} coins`,
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    interaction.client.cooldowns.set(cooldownKey, Date.now() + 10 * 60 * 1000);
    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig