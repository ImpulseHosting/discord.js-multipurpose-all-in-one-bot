const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("covid-stats")
    .setDescription("Fetches COVID-19 statistics.")
    .addStringOption((option) =>
      option
        .setName("country")
        .setDescription(
          "The country to get stats for (leave blank for worldwide)"
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const country = interaction.options.getString("country");
    const endpoint = country
      ? `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(
          country
        )}`
      : `https://disease.sh/v3/covid-19/all`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}`
        );
      }

      const data = await response.json();
      const embed = new EmbedBuilder()
        .setColor(0x1e90ff)
        .setTitle(
          `COVID-19 Statistics ${
            country ? `for ${data.country}` : "(Worldwide)"
          }`
        )
        .setThumbnail(
          country
            ? data.countryInfo.flag
            : "https://disease.sh/assets/img/flags/earth.png"
        )
        .addFields(
          {
            name: "Total Cases",
            value: data.cases.toLocaleString(),
            inline: true,
          },
          {
            name: "Active Cases",
            value: data.active.toLocaleString(),
            inline: true,
          },
          {
            name: "Recovered",
            value: data.recovered.toLocaleString(),
            inline: true,
          },
          { name: "Deaths", value: data.deaths.toLocaleString(), inline: true },
          {
            name: "Today's Cases",
            value: data.todayCases.toLocaleString(),
            inline: true,
          },
          {
            name: "Today's Deaths",
            value: data.todayDeaths.toLocaleString(),
            inline: true,
          },
          {
            name: "Critical Cases",
            value: data.critical.toLocaleString(),
            inline: true,
          },
          {
            name: "Tests Conducted",
            value: data.tests.toLocaleString(),
            inline: true,
          },
          {
            name: "Population",
            value: data.population.toLocaleString(),
            inline: true,
          }
        )
        .setFooter({
          text: "Data provided by disease.sh API",
          iconURL: "https://disease.sh/assets/img/flags/earth.png",
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in /covid-stats command:", error);
      await interaction.editReply({
        content: `An error occurred while fetching COVID-19 stats. ${error.message}`,
        ephemeral: true,
      });
    }
  },
};

// made by manny1_. and ezoig