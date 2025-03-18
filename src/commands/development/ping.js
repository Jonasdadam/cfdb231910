const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot to see if it's online.")
    .setDMPermission(false)
    .toJSON(),
  deleted: false,
  devOnly: true,
  testMode: true,
  userPermissions: [],
  botPermissions: [],

  run: (client, interaction) => {
    return interaction.reply("Pong!");
  },
};