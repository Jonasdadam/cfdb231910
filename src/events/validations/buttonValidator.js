require("colors");

const { EmbedBuilder } = require("discord.js");
const config = require("../../configs/config.js");
const getButtons = require("../../utils/getButtons");
const dbQuery = require("../../database/DBfunctions/validationsFunctions");


module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;

  const allowedUsersIds = await dbQuery.GetAllowedUsers();

  const rEmbed = new EmbedBuilder().setColor(`${config.colors.redColor}`);

  const buttons = getButtons();

  try {
    const buttonObject = buttons.find(
      (btn) => interaction.customId.startsWith(btn.customId)
    );
    if (!buttonObject) return;

    if (buttonObject.devOnly) {
      if (!config.developement.developersID.includes(interaction.member.id)) {
        rEmbed.setDescription(`${config.messages.commandDevOnly}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (buttonObject.testMode) {
      if (interaction.guild.id !== config.developement.devServerID) {
        rEmbed.setDescription(`${config.messages.commandTestMode}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (buttonObject.userPermissions?.length) {
      for (const permission of buttonObject.userPermissions) {
        if (interaction.member.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.userNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (buttonObject.botPermissions?.length) {
      for (const permission of buttonObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (bot.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.botNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    await buttonObject.run(client, interaction);
  } catch (err) {
    console.log(`An error occurred! ${err}`.red);
  }
};
