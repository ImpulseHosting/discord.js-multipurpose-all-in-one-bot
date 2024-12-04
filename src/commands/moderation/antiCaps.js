const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const anticaps = require("../../database/schemas/anticaps");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anti-caps")
    .setDescription("Anti Caps.")
    .addSubcommand((command) =>
      command
        .setName("setup")
        .setDescription("Setup anti caps system.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to block caps in")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("allowed-ids")
            .setDescription(
              "List the allowed user IDs: 1145488434614505543, 1143551190731333662" // put the user ids allowed to do more then 5 capitals
            )
        )
    )
    .addSubcommand((command) =>
      command
        .setName("disable")
        .setDescription("Disable the anti caps system")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to disable anti caps in")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const { options } = interaction;
    const sub = options.getSubcommand();

    const channel = options.getChannel("channel");
    const data = await anticaps.findOne({
      Guild: interaction.guild.id,
      Channel: channel.id,
    });

    async function sendMessage(message) {
      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(message);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    switch (sub) {
      case "setup":
        if (data) {
          await sendMessage(`⚠️ This system is already setup in ${channel}`);
        } else {
          const allowedIds = options.getString("allowed-ids");

          var allowedArray = [];
          if (allowedIds) {
            allowedArray = allowedIds.split(",").map((num) => num.trim());
          }

          await anticaps.create({
            Guild: interaction.guild.id,
            Channel: channel.id,
            AllowedUsers: allowedArray,
          });

          await sendMessage(
            `🌍 I have setup the anti caps system in ${channel}`
          );
        }
        break;
      case "disable":
        if (!data) {
          await sendMessage(`⚠️ There is no system setup in ${channel}`);
        } else {
          await anticaps.deleteOne({
            Guild: interaction.guild.id,
            Channel: channel.id,
          });

          await sendMessage(
            `🌍 I have disable the anti caps system in ${channel}`
          );
        }
    }
  },
};

// made by manny1_. and ezoig