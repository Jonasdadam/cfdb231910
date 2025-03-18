const { Client, StringSelectMenuInteraction } = require("discord.js");

module.exports = {
    customId: "exampleSSM",
    devOnly: false,
    testMode: false,
    userPermissions: [],
    botPermissions: [],
  /**
   * 
   * @param {Client} client
   * @param {StringSelectMenuInteraction} interaction
   */

  run: async (client, interaction) => {

    try {

        const stemmingId = interaction.customId.split('_')[1];

        await interaction.deferReply({ephemeral: true});
        await interaction.editReply({content: `Wapens voor ${stemmingId} aangevraagd!`, components: [], ephemeral: true});
        await interaction.channel.send({content: `${stemmingId} wil:\n${interaction.values.join(',\n')}`});

      
    } catch (error) {
        console.log(error);
        await interaction.reply({ content: "Er is iets misgegaan! De fout is gemeld.", ephemeral: true });
    }
  }
};