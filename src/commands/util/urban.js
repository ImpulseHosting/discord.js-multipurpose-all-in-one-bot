const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("Fetches a definition from Urban Dictionary.")
    .addStringOption((option) =>
      option
        .setName("term")
        .setDescription("The word or phrase to define.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const term = interaction.options.getString("term");
    await interaction.deferReply();

    try {
      const response = await fetch(
        `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
          term
        )}`
      );
      const data = await response.json();

      if (!data.list || data.list.length === 0) {
        return interaction.editReply(`No results found for **${term}**.`);
      }
      const entry = data.list[0];
      const embed = new EmbedBuilder()
        .setTitle(`Definition for: ${term}`)
        .setURL(entry.permalink)
        .setDescription(
          entry.definition.length > 2000
            ? `${entry.definition.slice(0, 1997)}...`
            : entry.definition
        )
        .addFields(
          {
            name: "Example",
            value:
              entry.example.length > 1024
                ? `${entry.example.slice(0, 1021)}...`
                : entry.example || "None",
            inline: false,
          },
          {
            name: "Author",
            value: entry.author || "Unknown",
            inline: true,
          },
          {
            name: "Votes",
            value: `👍 ${entry.thumbs_up} | 👎 ${entry.thumbs_down}`,
            inline: true,
          },
          {
            name: "Definition ID",
            value: entry.defid.toString(),
            inline: true,
          }
        )
        .setColor("#1D2439")
        .setFooter({
          text: "Powered by Urban Dictionary",
          iconURL: "https://i.imgur.com/LUqJKo5.png",
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error fetching Urban Dictionary data: ${error}`);
      interaction.editReply(
        "There was an error fetching the definition. Please try again later."
      );
    }
  },
};

// made by manny1_. and ezoig