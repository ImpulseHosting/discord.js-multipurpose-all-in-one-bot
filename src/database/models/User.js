// * please dont touch anything in here 💀 * \\

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 250 },
  bank: { type: Number, default: 0 },
  safe: { type: Number, default: 0 },
  vault: { type: Number, default: 0 },
  bankCapacity: { type: Number, default: 25000 },
  safeCapacity: { type: Number, default: 100000 },
  vaultCapacity: { type: Number, default: 500000 },
  inventory: {
    fish: {
      type: [
        {
          name: { type: String, required: true },
          amount: { type: Number, default: 0 },
          price: { type: Number, required: true },
          rarity: { type: String, required: true },
          emoji: { type: String, required: true },
        },
      ],
      default: [],
    },
    items: {
      type: [
        {
          name: { type: String, required: true },
          amount: { type: Number, default: 0 },
          price: { type: Number, required: true },
          rarity: { type: String, required: true },
          emoji: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  job: {
    type: String,
    default: null,
  },
  jobExperience: {
    type: Number,
    default: 0,
  },
  isWorking: {
    type: Boolean,
    default: false,
  },
  jobEmoji: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

// made by manny1_. and ezoig