const { SlashCommandBuilder,PermissionFlagsBits, EmbedBuilder} = require('discord.js');
const { executeQuery } = require('../../database/DBfunctions/queryHandler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testdb")
    .setDescription("Test de verbinding met de database en voert een simpele query uit.")
    .setDMPermission(false)
    .toJSON(),
  deleted: false,
  devOnly: false,
  testMode: false,
  userPermissions: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],

  run: async (client, interaction) => {
    await interaction.deferReply(); // Antwoord uitstellen terwijl de test loopt

        try {
            const result = await executeQuery('SELECT 1');
            if (result) {
                await interaction.editReply('✅ Databaseverbinding werkt correct! 🎉');
            } else {
                await interaction.editReply('⚠️ Databaseverbinding werkt, maar gaf geen resultaten.');
            }
        } catch (error) {
            console.error('Fout bij het testen van de database:', error);
            await interaction.editReply(`❌ Databaseverbinding mislukt! Fout: \`${error.message}\``);
        }
},
};