const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    PermissionFlagsBits,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");
  
  module.exports = {
    data: new ContextMenuCommandBuilder()
      .setName("Ontslaan")
      .setType(ApplicationCommandType.User),
    userPermissions: [],
    botPermissions: [],
  
    run: async (client, interaction) => {
        const { targetMember } = interaction;

    },
  };
  