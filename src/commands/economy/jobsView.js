const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jobs-view")
    .setDescription("View the available jobs to apply for!"),

  async execute(interaction) {
    const availableJobs = [
      {
        name: "Farmer",
        emoji: "🌾",
        salary: "50 coins/day",
        description: "Plant and harvest crops.",
      },
      {
        name: "Miner",
        emoji: "⛏️",
        salary: "100 coins/day",
        description: "Mine precious metals.",
      },
      {
        name: "Merchant",
        emoji: "🛒",
        salary: "150 coins/day",
        description: "Buy and sell goods.",
      },
    ];

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Available Jobs")
      .setDescription("Here are all the jobs available for applications:")
      .setThumbnail(
        "https://thumbs.dreamstime.com/b/job-application-2588230.jpg"
      )
      .setFooter({ text: "Choose a job wisely." })
      .addFields(
        availableJobs.map((job) => ({
          name: `${job.emoji} ${job.name} - ${job.salary}`,
          value: job.description,
        }))
      );

    return interaction.reply({ embeds: [embed] });
  },
};
