const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

const fish = [
  { name: "Minnow", emoji: "🐟", price: 50, rarity: "Common", probability: 30 },
  {
    name: "Trout",
    emoji: "🐠",
    price: 150,
    rarity: "Uncommon",
    probability: 30,
  },
  { name: "Salmon", emoji: "🐡", price: 500, rarity: "Rare", probability: 25 },
  {
    name: "Swordfish",
    emoji: "🦈",
    price: 2000,
    rarity: "Epic",
    probability: 10,
  },
  {
    name: "Golden Koi",
    emoji: "🐉",
    price: 5000,
    rarity: "Legendary",
    probability: 5,
  },
  {
    name: "Bass",
    emoji: "🐟",
    price: 200,
    rarity: "Uncommon",
    probability: 28,
  },
  {
    name: "Catfish",
    emoji: "🐱",
    price: 400,
    rarity: "Rare",
    probability: 18,
  },
  {
    name: "Angelfish",
    emoji: "🐠",
    price: 600,
    rarity: "Rare",
    probability: 15,
  },
  {
    name: "Mahi Mahi",
    emoji: "🐋",
    price: 1200,
    rarity: "Epic",
    probability: 12,
  },
  {
    name: "Piranha",
    emoji: "🦈",
    price: 2000,
    rarity: "Epic",
    probability: 7,
  },
  {
    name: "Blue Tang",
    emoji: "🐠",
    price: 1000,
    rarity: "Rare",
    probability: 20,
  },
  {
    name: "Clownfish",
    emoji: "🐠",
    price: 700,
    rarity: "Uncommon",
    probability: 22,
  },
  {
    name: "Stingray",
    emoji: "🦈",
    price: 1800,
    rarity: "Epic",
    probability: 10,
  },
  {
    name: "Marlin",
    emoji: "🐋",
    price: 2500,
    rarity: "Legendary",
    probability: 5,
  },
  {
    name: "Tuna",
    emoji: "🐟",
    price: 1500,
    rarity: "Epic",
    probability: 8,
  },
  {
    name: "Shark",
    emoji: "🦈",
    price: 4000,
    rarity: "Legendary",
    probability: 4,
  },
  {
    name: "Pufferfish",
    emoji: "🐡",
    price: 800,
    rarity: "Uncommon",
    probability: 18,
  },
  {
    name: "Jellyfish",
    emoji: "🪼",
    price: 300,
    rarity: "Common",
    probability: 25,
  },
  {
    name: "Electric Eel",
    emoji: "⚡",
    price: 1500,
    rarity: "Rare",
    probability: 12,
  },
  {
    name: "Red Snapper",
    emoji: "🐠",
    price: 1200,
    rarity: "Uncommon",
    probability: 22,
  },
  {
    name: "Swordtail",
    emoji: "🐟",
    price: 800,
    rarity: "Uncommon",
    probability: 20,
  },
  {
    name: "Whale Shark",
    emoji: "🦈",
    price: 4500,
    rarity: "Legendary",
    probability: 2,
  },
  {
    name: "Killer Whale",
    emoji: "🐋",
    price: 3500,
    rarity: "Legendary",
    probability: 3,
  },
  {
    name: "Seahorse",
    emoji: "🐴",
    price: 500,
    rarity: "Common",
    probability: 30,
  },
  {
    name: "Goldfish",
    emoji: "🐠",
    price: 100,
    rarity: "Common",
    probability: 35,
  },
  {
    name: "Lake Sturgeon",
    emoji: "🐟",
    price: 700,
    rarity: "Rare",
    probability: 16,
  },
  {
    name: "Alligator Gar",
    emoji: "🐊",
    price: 1200,
    rarity: "Rare",
    probability: 14,
  },
  {
    name: "Lionfish",
    emoji: "🐟",
    price: 1300,
    rarity: "Epic",
    probability: 10,
  },
  {
    name: "Guppy",
    emoji: "🐟",
    price: 50,
    rarity: "Common",
    probability: 40,
  },
  {
    name: "Redfish",
    emoji: "🐟",
    price: 1100,
    rarity: "Rare",
    probability: 13,
  },
  {
    name: "Kingfish",
    emoji: "🐠",
    price: 2200,
    rarity: "Epic",
    probability: 6,
  },
  {
    name: "Megalodon",
    emoji: "🦈",
    price: 10000,
    rarity: "Legendary",
    probability: 1,
  },
  {
    name: "Fugu",
    emoji: "🐡",
    price: 3500,
    rarity: "Epic",
    probability: 5,
  },
  {
    name: "Tiger Shark",
    emoji: "🦈",
    price: 3200,
    rarity: "Legendary",
    probability: 2,
  },
  {
    name: "Barracuda",
    emoji: "🐟",
    price: 900,
    rarity: "Uncommon",
    probability: 18,
  },
  {
    name: "Sailfish",
    emoji: "🐟",
    price: 2500,
    rarity: "Legendary",
    probability: 3,
  },
  {
    name: "Arowana",
    emoji: "🐠",
    price: 1700,
    rarity: "Rare",
    probability: 13,
  },
  {
    name: "Redtail Catfish",
    emoji: "🐠",
    price: 2200,
    rarity: "Epic",
    probability: 9,
  },
  {
    name: "Bluegill",
    emoji: "🐟",
    price: 600,
    rarity: "Common",
    probability: 25,
  },
  {
    name: "Chum",
    emoji: "🐟",
    price: 100,
    rarity: "Common",
    probability: 30,
  },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Fish for something valuable!"),
  async execute(interaction) {
    const userId = interaction.user.id;

    let user = await User.findOne({ userId });
    if (!user) {
      return interaction.reply({
        content: "You need to create an account first.",
        ephemeral: true,
      });
    }

    const lastFish = interaction.client.cooldowns.get(`fish-${userId}`);
    if (lastFish && Date.now() - lastFish < 10 * 60 * 1000) {
      const remaining = Math.ceil(
        (10 * 60 * 1000 - (Date.now() - lastFish)) / 1000
      );
      return interaction.reply({
        content: `🕒 Wait ${remaining}s before fishing again!`,
        ephemeral: true,
      });
    }

    interaction.client.cooldowns.set(`fish-${userId}`, Date.now());

    const success = Math.random() < 0.7;
    if (!success) {
      return interaction.reply(
        "🎣 The fish slipped away... Better luck next time!"
      );
    }

    const roll = Math.random() * 100;
    let accumulated = 0;
    const catchFish = fish.find((item) => {
      accumulated += item.probability;
      return roll < accumulated;
    });

    user = await User.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: { "inventory.fish": [] },
        $inc: { coins: catchFish.price },
      },
      { upsert: true, new: true }
    );

    const existingFish = user.inventory.fish.find(
      (f) => f.name === catchFish.name
    );

    if (existingFish) {
      existingFish.amount++;
    } else {
      user.inventory.fish.push({ ...catchFish, amount: 1 });
    }

    await user.save();

    const embed = new EmbedBuilder()
      .setColor(0x1e90ff)
      .setTitle("You caught a fish!")
      .setDescription(
        `🎉 You caught **${catchFish.emoji} ${catchFish.name}**!\n` +
          `💰 Worth: **${catchFish.price} coins**\n` +
          `⭐ Rarity: **${catchFish.rarity}**`
      );

    return interaction.reply({ embeds: [embed] });
  },
};

// made by manny1_. and ezoig
