const { SlashCommandBuilder } = require('discord.js');
const { Emojify } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojify')
    .setDescription('Convert your text into emojis!')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('The text to emojify')
        .setRequired(true)),

  async execute(interaction) {
    const inputText = interaction.options.getString('text');
    const emojifiedText = Emojify(inputText);

    await interaction.reply({
      content: emojifiedText,
    });
  },
};

// you CANT use spaces such as 'Hi There' only do 'HiThere'

// made by manny1_. and ezoig