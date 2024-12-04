// * this does nothing for now 💀 * \\

const chalk = require("chalk");

const currentTime = new Date().toLocaleTimeString();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    try {
      await client.user.setPresence({
        status: "online",
      });
      console.log(chalk.bold.underline.cyan(currentTime) + chalk.bold.underline.green(" | Activity set to 'WATCHING Awesome'!"))
    } catch (error) {
      console.error("Error setting presence:", error);
    }
  },
};

// made by manny1_. and ezoig