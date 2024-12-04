const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

const treasures = [
  {
    name: "Rusty Nail",
    emoji: "🪛",
    price: 50,
    rarity: "Common",
    probability: 30,
  },
  {
    name: "Old Coin",
    emoji: "🪙",
    price: 150,
    rarity: "Uncommon",
    probability: 30,
  },
  {
    name: "Silver Ring",
    emoji: "💍",
    price: 500,
    rarity: "Rare",
    probability: 25,
  },
  {
    name: "Ancient Relic",
    emoji: "📿",
    price: 2000,
    rarity: "Epic",
    probability: 10,
  },
  {
    name: "Cursed Treasure",
    emoji: "💎",
    price: 5000,
    rarity: "Legendary",
    probability: 5,
  },
  {
    name: "Golden Goblet",
    emoji: "🍷",
    price: 1000,
    rarity: "Rare",
    probability: 15,
  },
  {
    name: "Dragon's Tooth",
    emoji: "🐉",
    price: 3500,
    rarity: "Epic",
    probability: 8,
  },
  {
    name: "Pirate's Chest",
    emoji: "🏴‍☠️",
    price: 7500,
    rarity: "Legendary",
    probability: 3,
  },
  {
    name: "Mystic Amulet",
    emoji: "🔮",
    price: 2500,
    rarity: "Epic",
    probability: 12,
  },
  {
    name: "Enchanted Sword",
    emoji: "🗡️",
    price: 800,
    rarity: "Uncommon",
    probability: 20,
  },
  {
    name: "Moonstone",
    emoji: "🌕",
    price: 3000,
    rarity: "Rare",
    probability: 10,
  },
  {
    name: "Phoenix Feather",
    emoji: "🪶",
    price: 6000,
    rarity: "Epic",
    probability: 7,
  },
  {
    name: "Vampire's Cloak",
    emoji: "🧛‍♂️",
    price: 4500,
    rarity: "Legendary",
    probability: 4,
  },
  {
    name: "Timeworn Tome",
    emoji: "📚",
    price: 1800,
    rarity: "Uncommon",
    probability: 18,
  },
  {
    name: "Crystal Skull",
    emoji: "💀",
    price: 4000,
    rarity: "Rare",
    probability: 9,
  },
  {
    name: "Golden Apple",
    emoji: "🍎",
    price: 1200,
    rarity: "Epic",
    probability: 11,
  },
  {
    name: "Dragon Scale",
    emoji: "🪶",
    price: 3200,
    rarity: "Epic",
    probability: 6,
  },
  {
    name: "Silver Coin",
    emoji: "🪙",
    price: 300,
    rarity: "Uncommon",
    probability: 22,
  },
  {
    name: "Spectral Lantern",
    emoji: "🏮",
    price: 5500,
    rarity: "Legendary",
    probability: 2,
  },
  {
    name: "King's Crown",
    emoji: "👑",
    price: 10000,
    rarity: "Legendary",
    probability: 1,
  },
  {
    name: "Star Fragment",
    emoji: "🌟",
    price: 1500,
    rarity: "Rare",
    probability: 17,
  },
  {
    name: "Wizard's Hat",
    emoji: "🎩",
    price: 2200,
    rarity: "Epic",
    probability: 14,
  },
  {
    name: "Mystic Potion",
    emoji: "🧪",
    price: 950,
    rarity: "Uncommon",
    probability: 25,
  },
  {
    name: "Unicorn Horn",
    emoji: "🦄",
    price: 7000,
    rarity: "Legendary",
    probability: 3,
  },
  {
    name: "Ancient Coin",
    emoji: "🪙",
    price: 2000,
    rarity: "Rare",
    probability: 8,
  },
  {
    name: "Troll's Trophy",
    emoji: "🏆",
    price: 1800,
    rarity: "Uncommon",
    probability: 16,
  },
  {
    name: "Fairy Dust",
    emoji: "✨",
    price: 400,
    rarity: "Common",
    probability: 30,
  },
  {
    name: "Silver Chalice",
    emoji: "🍷",
    price: 1600,
    rarity: "Rare",
    probability: 13,
  },
  {
    name: "Golden Key",
    emoji: "🗝️",
    price: 2500,
    rarity: "Epic",
    probability: 9,
  },
  {
    name: "Moonlit Mirror",
    emoji: "🪞",
    price: 2700,
    rarity: "Epic",
    probability: 8,
  },
  {
    name: "Dragon Egg",
    emoji: "🐲",
    price: 4000,
    rarity: "Legendary",
    probability: 4,
  },
  {
    name: "Silver Bracelet",
    emoji: "💍",
    price: 1800,
    rarity: "Uncommon",
    probability: 20,
  },
  {
    name: "Mermaid's Necklace",
    emoji: "🐚",
    price: 3000,
    rarity: "Epic",
    probability: 6,
  },
  {
    name: "Ancient Scroll",
    emoji: "📜",
    price: 2500,
    rarity: "Rare",
    probability: 12,
  },
  {
    name: "Giant's Hammer",
    emoji: "🪓",
    price: 5000,
    rarity: "Epic",
    probability: 5,
  },
  {
    name: "Mummy's Curse",
    emoji: "🧟‍♂️",
    price: 4500,
    rarity: "Legendary",
    probability: 2,
  },
  {
    name: "Golden Feather",
    emoji: "🪶",
    price: 2200,
    rarity: "Rare",
    probability: 12,
  },
  {
    name: "Frozen Heart",
    emoji: "❄️",
    price: 3500,
    rarity: "Epic",
    probability: 8,
  },
  {
    name: "Viking's Shield",
    emoji: "🛡️",
    price: 1500,
    rarity: "Uncommon",
    probability: 17,
  },
  {
    name: "Crystal Heart",
    emoji: "💖",
    price: 6000,
    rarity: "Legendary",
    probability: 3,
  },
  {
    name: "Magic Wand",
    emoji: "<:magic_wand:1313371796329988177>",
    price: 25000,
    rarity: "Mythical",
    probability: 1.5,
  },
  {
    name: "Highly Classified Cia Documents",
    emoji: "<:secrets:1313371781171777577>",
    price: 1000000,
    rarity: "Classified",
    probability: 0.5,
  },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dig")
    .setDescription("Dig for treasure!"),
  async execute(interaction) {
    const userId = interaction.user.id;

    let user = await User.findOne({ userId });
    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    const lastDig = interaction.client.cooldowns.get(`dig-${userId}`);
    if (lastDig && Date.now() - lastDig < 10 * 60 * 1000) {
      const remaining = Math.ceil(
        (10 * 60 * 1000 - (Date.now() - lastDig)) / 1000
      );
      return interaction.reply({
        content: `🕒 Wait ${remaining}s before digging again!`,
        ephemeral: true,
      });
    }

    interaction.client.cooldowns.set(`dig-${userId}`, Date.now());

    const success = Math.random() < 0.6;
    if (!success) {
      return interaction.reply(
        "💔 You dug through dirt but found nothing of value."
      );
    }

    const roll = Math.random() * 100;
    let accumulated = 0;
    const treasure = treasures.find((item) => {
      accumulated += item.probability;
      return roll < accumulated;
    });

    user = await User.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: { "inventory.items": [] },
        $inc: { coins: treasure.price },
      },
      { upsert: true, new: true }
    );

    const existingItem = user.inventory.items.find(
      (item) => item.name === treasure.name
    );

    if (existingItem) {
      existingItem.amount++;
    } else {
      user.inventory.items.push({ ...treasure, amount: 1 });
    }

    await user.save();

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("You found a treasure!")
      .setDescription(
        `🎉 You unearthed **${treasure.emoji} ${treasure.name}**!\n` +
          `💰 Worth: **${treasure.price} coins**\n` +
          `⭐ Rarity: **${treasure.rarity}**`
      );

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig