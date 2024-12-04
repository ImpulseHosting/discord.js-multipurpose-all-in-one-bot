const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  balance: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema);
