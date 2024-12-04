require("dotenv").config();
const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildModeration,
  ],
});

client.cooldowns = new Map();
const currentTime = new Date().toLocaleTimeString();
client.commands = new Collection();
client.events = new Collection();

const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands", folder))
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", folder, file));
    client.commands.set(command.data.name, command);
  }
}

const eventFiles = fs
  .readdirSync(path.join(__dirname, "events"))
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(__dirname, "events", file));
  const eventName = event.name || file.split(".")[0];
  if (event.once) {
    client.once(eventName, (...args) => event.execute(client, ...args));
  } else {
    client.on(eventName, (...args) => event.execute(client, ...args));
  }
}

const eventFolders = fs
  .readdirSync(path.join(__dirname, "events"))
  .filter((folder) =>
    fs.lstatSync(path.join(__dirname, "events", folder)).isDirectory()
  );

for (const folder of eventFolders) {
  const eventFiles = fs
    .readdirSync(path.join(__dirname, "events", folder))
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(path.join(__dirname, "events", folder, file));
    const eventName = event.name || file.split(".")[0];
    if (event.once) {
      client.once(eventName, (...args) => event.execute(client, ...args));
    } else {
      client.on(eventName, (...args) => event.execute(client, ...args));
    }
  }
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      chalk.bold.underline.cyan(currentTime) +
        chalk.bold.underline.green(" | Connected to MongoDB")
    )
  );

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      console.log(
        chalk.bold.underline.cyan(currentTime) +
          chalk.bold.underline.green(
            ` | Executed Command: ${command.data.name} successfully`
          )
      );
      await command.execute(interaction);
    } catch (error) {
      console.log(
        chalk.bold.underline.cyan(currentTime) +
          chalk.underline.red(" | Error executing command:", error)
      );
      await interaction.reply({
        content: "There was an error executing that command!",
        ephemeral: true,
      });
    }
  }
  if (interaction.isButton()) {
    const command = client.commands.get("inventory");
    if (command && command.handleButton) {
      try {
        await command.handleButton(interaction);
      } catch (error) {
        console.error("Error handling button interaction:", error);
        await interaction.reply({
          content: "There was an error handling that button interaction!",
          ephemeral: true,
        });
      }
    }
  }
});

client.once("ready", async () => {
  console.log(
    chalk.bold.underline.cyan(currentTime) +
      chalk.bold.underline.green(
        ` | Logged in as ${client.user.tag} (${client.user.id}) ✅`
      )
  );
  try {
    await client.application.commands.set(
      client.commands.map((cmd) => cmd.data)
    );
    console.log(
      chalk.underline.bold.cyan(currentTime) +
        chalk.underline.bold.green(" | Slash commands registered.")
    );
    console.log(chalk.bold.magenta("==================================="));
    await client.user.setPresence({
      activities: [{ name: "Awesome", type: ActivityType.Watching }],
      status: "online",
    });
  } catch (error) {
    console.error("Error during ready event:", error);
  }
});

client.login(process.env.TOKEN);

// made by manny1_. and ezoig
