const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banner")
    .setDescription("Displays a user's banner.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to get the banner of.")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const fetchedUser = await user.fetch(true);
    const bannerURL = fetchedUser.bannerURL({ size: 1024, dynamic: true });

    if (!bannerURL) {
      return interaction.reply({
        content: "This user does not have a banner.",
        ephemeral: true,
      });
    }

    const bannerEmbed = new EmbedBuilder()
      .setTitle(`${user.username}'s Banner`)
      .setImage(bannerURL)
      .setColor("#7289da")
      .setFooter({
        text: "Banner",
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [bannerEmbed] });
  },
};

// made by manny1_. and ezoig