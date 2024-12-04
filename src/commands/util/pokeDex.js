const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndent } = require("common-tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokedex")
    .setDescription("Fetches detailed information about a Pokémon.")
    .addStringOption((option) =>
      option
        .setName("pokemon")
        .setDescription("The name or ID of the Pokémon.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const pokemon = interaction.options.getString("pokemon").toLowerCase();

    await interaction.deferReply();

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();
      const id = data.id;
      const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const species =
        data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
      const types = data.types.map((type) => type.type.name).join(", ");
      const abilities = data.abilities
        .map((ability) => ability.ability.name)
        .join(", ");
      const hiddenAbilities = data.abilities
        .filter((ability) => ability.is_hidden)
        .map((ability) => ability.ability.name)
        .join(", ");
      const height = (data.height / 10).toFixed(1);
      const weight = (data.weight / 10).toFixed(1);
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      const evolutionLine = [];
      let evolutionChain = evolutionData.chain;

      while (evolutionChain) {
        evolutionLine.push(
          evolutionChain.species.name.charAt(0).toUpperCase() +
            evolutionChain.species.name.slice(1)
        );
        evolutionChain = evolutionChain.evolves_to[0];
      }

      const legendary = speciesData.is_legendary ? "Yes" : "No";
      const mythical = speciesData.is_mythical ? "Yes" : "No";
      const generation = speciesData.generation.name
        .toUpperCase()
        .replace("-", " ");

      const description = stripIndent`
        **ID:** ${id}
        **Species:** ${species}
        **Types:** ${types}
        **Abilities:** ${abilities}
        **Hidden Abilities:** ${hiddenAbilities || "None"}
        **Height:** ${height} meters
        **Weight:** ${weight} kg
        **Legendary:** ${legendary}
        **Mythical:** ${mythical}
        **Generation:** ${generation}
        **Evolution Line:** ${evolutionLine.join(" → ")}
      `;
      const embed = new EmbedBuilder()
        .setTitle(`${name} (#${id})`)
        .setDescription(description)
        .setThumbnail(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        )
        .setColor("#ffcb05")
        .setFooter({
          text: "Pokémon Data from PokéAPI",
          iconURL:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error fetching Pokémon data: ${error}`);
      interaction.editReply(
        "There was an error fetching the Pokémon data. Please try again later."
      );
    }
  },
};

// made by manny1_. and ezoig