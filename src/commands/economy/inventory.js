const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("View your inventory!"),
  async execute(interaction) {
    const userId = interaction.user.id;

    const user = await User.findOne({ userId });
    if (
      !user ||
      (!user.inventory.items.length && !user.inventory.fish.length)
    ) {
      return interaction.reply(
        "💼 Your inventory is empty! Start digging or fishing to collect treasures."
      );
    }

    const fishList = user.inventory.fish
      .map(
        (f) =>
          `- ${f.amount}x ${f.emoji} **${f.name}** | **${f.price} coins** (${f.rarity})`
      )
      .join("\n");
    const itemList = user.inventory.items
      .map(
        (i) =>
          `- ${i.amount}x ${i.emoji} **${i.name}** | **${i.price} coins** (${i.rarity})`
      )
      .join("\n");

    const description = [
      "**🎣 Fish:**",
      fishList || "No fish found!",
      "\n**📦 Items:**",
      itemList || "No items found!",
    ].join("\n");

    const embed = new EmbedBuilder()
      .setColor(0xf9a825)
      .setTitle(`${interaction.user.username}'s Inventory`)
      .setDescription(description)
      .setFooter({ text: "Click 'Sell All' to cash in everything at once!" });

    const sellAllButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("sell_all")
        .setEmoji("💰")
        .setLabel("Sell All")
        .setStyle(ButtonStyle.Success)
    );

    return interaction.reply({ embeds: [embed], components: [sellAllButton] });
  },
  async handleButton(interaction) {
    if (interaction.customId !== "sell_all") return;

    const userId = interaction.user.id;

    const user = await User.findOne({ userId });
    if (
      !user ||
      (!user.inventory.items.length && !user.inventory.fish.length)
    ) {
      return interaction.reply({
        content: "💼 Your inventory is empty!",
        ephemeral: true,
      });
    }

    const totalCoins = [...user.inventory.fish, ...user.inventory.items].reduce(
      (acc, obj) => acc + obj.price * obj.amount,
      0
    );

    user.coins += totalCoins;
    user.inventory.fish = [];
    user.inventory.items = [];
    await user.save();

    return interaction.update({
      content: `💰 You sold everything for **${totalCoins} coins**!`,
      embeds: [],
      components: [],
    });
  },
};

// made by manny1_. and ezoig