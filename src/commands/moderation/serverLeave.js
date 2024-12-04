const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  owner: true,
  data: new SlashCommandBuilder()
    .setName("server-leave")
    .setDescription("Leave a guild.")
    .addStringOption((option) =>
      option
        .setName("guild")
        .setDescription("The ID or name of the guild to leave")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const guild = options.getString("guild");

    async function sendMessage(message) {
      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(message);

      await interaction.reply({ embeds: [embed] });
    }

    var fetchedGuild = await interaction.client.guilds
      .fetch(guild)
      .catch((err) => {});
    var guilds = [];

    if (!fetchedGuild) {
      var gds = await interaction.client.guilds.fetch();
      await gds.forEach(async (value) => {
        if (value.name == guild) {
          guilds.push({ name: value.name, id: value.id });
        }
      });
    }

    if (fetchedGuild) {
      await fetchedGuild.leave();
      await sendMessage(`✅ I have left ${fetchedGuild.name}`).catch(
        (err) => {}
      );
    } else {
      if (guilds.length > 1) {
        await sendMessage(
          `⚠️ \`${guild}\` is a name that multiple servers I'm in have... Try using the guild id to get a better search`
        );
      } else {
        if (guilds.length == 0) {
          await sendMessage(`⚠️ I'm not in a guild matching \`${guild}\``);
        } else {
          fetchedGuild = await interaction.client.guilds.fetch(guilds[0].id);
          await fetchedGuild.leave();
          await sendMessage(`✅ I have left ${fetchedGuild.name}`).catch(
            (err) => {}
          );
        }
      }
    }
  },
};

// made by manny1_. and ezoig