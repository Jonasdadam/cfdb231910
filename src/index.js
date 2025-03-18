const config = require("./configs/config");

const { Client, GatewayIntentBits } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });

eventHandler(client);

client.login(config.botToken);