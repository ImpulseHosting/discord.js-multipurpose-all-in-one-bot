const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Get information about a GitHub repository.")
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription(
          'The repository in "owner/repo" format (e.g., "octocat/Hello-World").'
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const repo = interaction.options.getString("repo");
    await interaction.deferReply();

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      if (!response.ok) throw new Error("Repository not found.");
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setTitle(data.full_name)
        .setURL(data.html_url)
        .setDescription(data.description || "No description provided.")
        .setColor("#4078c0")
        .setThumbnail(data.owner.avatar_url)
        .addFields(
          {
            name: "Stars ⭐",
            value: data.stargazers_count.toString(),
            inline: true,
          },
          {
            name: "Forks 🍴",
            value: data.forks_count.toString(),
            inline: true,
          },
          {
            name: "Issues 🐛",
            value: data.open_issues_count.toString(),
            inline: true,
          },
          {
            name: "License 📜",
            value: data.license?.name || "None",
            inline: true,
          },
          {
            name: "Last Updated",
            value: `<t:${Math.floor(
              new Date(data.updated_at).getTime() / 1000
            )}:R>`,
            inline: true,
          }
        )
        .setFooter({
          text: `Created by ${data.owner.login}`,
          iconURL: data.owner.avatar_url,
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error fetching GitHub data: ${error}`);
      await interaction.editReply(
        "There was an error fetching the repository data. Please check the repository name and try again."
      );
    }
  },
};

// made by manny1_. and ezoig