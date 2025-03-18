const { PermissionFlagsBits, EmbedBuilder, ThreadAutoArchiveDuration, ChannelType } = require("discord.js");
const dbQueryMembers = require("../database/DBfunctions/memberFunctions");
const config = require("../configs/config.json");
const { getCurrentDateTime } = require('../functions/GetDateTime');


module.exports = {
  customId: "memberAannemen_MDL",
  userPermissions: [],
  botPermissions: [],

  run: async (client, interaction) => {
        const { message, fields } = interaction;

        await interaction.deferReply({ ephemeral: true });
        
        const memberName = fields.getTextInputValue("memberName_Input");
        const discordUserID = fields.getTextInputValue("memberDiscordID_Input");
        const discordUserName = fields.getTextInputValue("memberDiscordName_Input");


  },
};