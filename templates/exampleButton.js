const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ThreadAutoArchiveDuration, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  customId: 'exampleBTN',
  userPermissions: [],
  botPermissions: [],

  run: async (client, interaction) => {
    if (!interaction.customId.match(/^vote_results_\d+$/)) return;
    await interaction.reply({ content: "Example", ephemeral: true });
  },
};