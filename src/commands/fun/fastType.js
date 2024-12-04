const { FastType } = require("discord-gamecord");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fasttype")
    .setDescription("Test your typing skills!"),

  async execute(interaction) {
    const Game = new FastType({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "Fast Type 🎹",
        color: "#5865F2",
        description: "You have {time} seconds to type the sentence below.",
      },
      timeoutTime: 60000,
      sentence: "Very good sentence to type.", // more sentances added next update
      winMessage:
        "You won! You finished the typing race in {time} seconds with the wpm of {wpm}.",
      loseMessage: "You lost... You didn't type the correct sentence in time.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result);
    });
  },
};

// made by manny1_. and ezoig
