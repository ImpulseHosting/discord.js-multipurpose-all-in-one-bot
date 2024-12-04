const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const QRCode = require("qrcode");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Generate a QR code from text or a URL.")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The text or URL to generate a QR code for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const input = interaction.options.getString("input");
    await interaction.deferReply();

    try {
      const qrCodeBuffer = await QRCode.toBuffer(input);
      const attachment = new AttachmentBuilder(qrCodeBuffer, {
        name: "qrcode.png",
      });

      await interaction.editReply({
        content: `Here is your QR code for: \`${input}\``,
        files: [attachment],
      });
    } catch (error) {
      console.error(`Error generating QR Code: ${error}`);
      await interaction.editReply(
        "There was an error generating the QR code | try again soon"
      );
    }
  },
};

// made by manny1_. and ezoig