const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("br-map")
    .setDescription("Get the current Fortnite BR map image"),

  async execute(interaction) {
    try {
      const response = await fetch("https://fortnite-api.com/v1/map");
      const data = await response.json();

      if (data.status === 200) {
        const mapImage = data.data.images.blank;

        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("Fortnite BR Map")
          .setDescription("Here is the current Fortnite BR map:")
          .setImage(mapImage)
          .setFooter({ text: "Data provided by Fortnite API" });

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({
          content: "Could not fetch the map. Please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "An error occurred while fetching the map.",
      });
    }
  },
};

// made by manny1_. and ezoig