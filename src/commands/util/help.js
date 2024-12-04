const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides help for commands with dropdown selection.")
    .addIntegerOption(option =>
      option
        .setName("category")
        .setDescription("Select a category")
        .setRequired(true)
        .addChoices(
          { name: "Economy", value: 1 },
          { name: "Fun", value: 2 },
          { name: "Info", value: 3 },
          { name: "Utility", value: 4 },
          { name: "Moderation", value: 5}
        )
    ),

  async execute(interaction) {
    const selectedCategory = interaction.options.getInteger("category");

    let embed;

    switch (selectedCategory) {
      case 1:
        embed = new EmbedBuilder()
          .setTitle("Economy Commands")
          .setColor("#00FF00")
          .setThumbnail('https://images-ext-1.discordapp.net/external/2MLIPa0RdGPEl-2uEtM0pya6MnyETeqHZsEynJYQTA4/https/share.creavite.co/6741120eb23406fceac150ab.gif')
          .setImage('https://share.creavite.co/6747d4f48d50aabc5606a41c.gif')
          .setDescription(
              "**/add-coins** - Add coins to a user's wallet\n" +
              "**/remove-coins** - Remove coins from a user's wallet\n" +
              "**/gamble** - Gamble your coins\n" +
              "**/deposit** - Deposit coins into your wallet\n" +
              "**/transfer** - Transfer coins to another user\n" +
              "**/steal** - Steal coins from a user\n" +
              "**/wallet** - View your wallet\n" +
              "**/upgrade** - Upgrade your storage capacity\n" +
              "**/daily** - Get your daily coins\n" +
              "**/create-account** - Create your account\n" +
              "**/beg** - Beg for coins\n" +
              "**/inventory** - Show your fish/items inventory\n" +
              "**/dig** - Dig for items\n" +
              "**/fish** - Fish for fish"
          );
        break;
      case 2:
        embed = new EmbedBuilder()
          .setTitle("Fun Commands")
          .setColor("#FFD700")
          .setThumbnail('https://images-ext-1.discordapp.net/external/2MLIPa0RdGPEl-2uEtM0pya6MnyETeqHZsEynJYQTA4/https/share.creavite.co/6741120eb23406fceac150ab.gif')
          .setImage('https://share.creavite.co/6747d4f48d50aabc5606a41c.gif')
          .setDescription(
              "**/emojify** - Emojify your text\n" +
              "**/fasttype** - See how fast your typing skills are\n" +
              "**/minesweeper** - See if you can survive the mines\n" +
              "**/snake** - Play a game of snake"
          );
        break;
      case 3:
        embed = new EmbedBuilder()
          .setTitle("Info Commands")
          .setColor("#7289DA")
          .setThumbnail('https://images-ext-1.discordapp.net/external/2MLIPa0RdGPEl-2uEtM0pya6MnyETeqHZsEynJYQTA4/https/share.creavite.co/6741120eb23406fceac150ab.gif')
          .setImage('https://share.creavite.co/6747d4f48d50aabc5606a41c.gif')
          .setDescription(
              "**/inviteinfo** - Show information on an invite\n" +
              "**/userinfo** - Get information about a user\n" +
              "**/serverinfo** - Get information about the server\n" +
              "**/ping** - Show the bot's latency\n" +
              "**/free-hosting** - Shows the best free hosting service"
          );
        break;
      case 4:
        embed = new EmbedBuilder()
          .setTitle("Utility Commands")
          .setColor("#00FFFF")
          .setThumbnail('https://images-ext-1.discordapp.net/external/2MLIPa0RdGPEl-2uEtM0pya6MnyETeqHZsEynJYQTA4/https/share.creavite.co/6741120eb23406fceac150ab.gif')
          .setImage('https://share.creavite.co/6747d4f48d50aabc5606a41c.gif')
          .setDescription(
              "**/avatar** - View a user's avatar\n" +
              "**/banner** - View a user's banner\n" +
              "**/covid-stats** - Get all-time covid stats\n" +
              "**/github** - View a GitHub repo\n" +
              "**/help** - Show this help menu\n" +
              "**/password** - Generate a random password\n" +
              "**/pokedex** - Get stats on a Pokémon\n" +
              "**/qrcode** - Create a QR code from a link\n" +
              "**/urban** - Fetch a definition from Urban Dictionary"
          );
        break;
      case 5:
        embed = new EmbedBuilder()
          .setTitle("Moderation Commands")
          .setColor("White")
          .setThumbnail('https://images-ext-1.discordapp.net/external/2MLIPa0RdGPEl-2uEtM0pya6MnyETeqHZsEynJYQTA4/https/share.creavite.co/6741120eb23406fceac150ab.gif')
          .setImage('https://share.creavite.co/6747d4f48d50aabc5606a41c.gif')
          .setDescription(
            "**/addrole** - Add a role to a user\n" +
            "**/anti-caps setup** - Setup anti caps system\n" +
            "**/anti-caps disable** - Disable the anti caps system\n" +
            "**/ban** - Ban a user\n" +
            "**/unban** - Unban a user\n" +
            "**/removerole** - Remove a role from a user\n" +
            "**/serverleave** - Force the bot to leave a guild (bot owner only)\n" +
            "**/kick** - Kick a user from the server\n" +
            "**/warnings** - View a users warnings\n" +
            "**/warn** - Warn a user\n" +
            "**/unwarn** - Unwarn a user\n" +
            "**/lock** - Lock a channel\n" +
            "**/unlock** - Unlocks a channel\n" +
            "**/slowmode** - Enable slowmode in a channel\n" +
            "**/unslowmode** - Remove slowmode from a channel\n" +
            "**/setnick** - Set a users nickname\n" +
            "**/resetnick** - Remove a users nicname\n" +
            "**/mute** - Mutes a user\n" +
            "**/unmute** - Unmute a user"
          )
          break;
      default:
        embed = new EmbedBuilder()
          .setTitle("Error")
          .setColor("#FF0000")
          .setDescription("An error occurred while processing your selection.");
    }

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};

// made by manny1_. and ezoig