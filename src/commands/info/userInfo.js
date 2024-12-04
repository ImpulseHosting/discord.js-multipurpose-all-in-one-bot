const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Displays information about a user!")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to get information about")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const target = interaction.options.getUser("target") || interaction.user;
      const member = await interaction.guild.members.fetch(target.id);

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${target.tag}'s - User Information`)
        .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
        .addFields(
          {
            name: "<:username:1307544551602393172> Username",
            value: `${target.username}`,
            inline: false,
          },
          { name: ":id: ID", value: `${target.id}`, inline: false },
          {
            name: "<:tag:1307544956659044425> Tag",
            value: `${target.discriminator}`,
            inline: false,
          },
          {
            name: "🕕 Account Created",
            value: `${moment(target.createdAt).format(
              "MMMM Do YYYY, h:mm:ss a"
            )} (${moment(target.createdAt).fromNow()})`,
            inline: false,
          },
          {
            name: "🕕 Joined Server",
            value: `${moment(member.joinedAt).format(
              "MMMM Do YYYY, h:mm:ss a"
            )} (${moment(member.joinedAt).fromNow()})`,
            inline: false,
          },
          {
            name: "<:roles:1307545500890824765> Roles",
            value:
              member.roles.cache
                .filter((role) => role.name !== "@everyone")
                .map((role) => `<@&${role.id}>`)
                .join(", ") || "None",
          }
        )
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(chalk.red("Error in userinfo command:", error));
      await interaction.editReply({
        content: `There was an error while executing this command! Error: ${error.message}`,
      });
    }
  },
};

// made by manny1_. and ezoig