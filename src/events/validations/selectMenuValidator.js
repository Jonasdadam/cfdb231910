require("colors");

const { EmbedBuilder, Client } = require("discord.js");
const config = require("../../configs/config.js");
const getSelects = require("../../utils/getSelects");
const dbQuery = require("../../database/DBfunctions/validationsFunctions");


/**
 *
 * @param {Client} client
 * @param {import("discord.js").AnySelectMenuInteraction} interaction
 * @returns
 */
module.exports = async (client, interaction) => {
  if (!interaction.isAnySelectMenu()) return;

  const allowedUsersIds = await dbQuery.GetAllowedUsers();

  const rEmbed = new EmbedBuilder().setColor(`${config.colors.redColor}`);

  const selects = getSelects();

  try {
    const selectObject = selects.find(
      (select) => interaction.customId.startsWith(select.customId)
    );
    if (!selectObject) return;

    if (selectObject.devOnly) {
      if (!config.developement.developersID.includes(interaction.member.id)) {
        rEmbed.setDescription(`${config.messages.commandDevOnly}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (selectObject.testMode) {
      if (interaction.guild.id !== config.developement.devServerID) {
        rEmbed.setDescription(`${config.messages.commandTestMode}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (selectObject.userPermissions?.length) {
      for (const permission of selectObject.userPermissions) {
        if (interaction.member.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.userNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (selectObject.botPermissions?.length) {
      for (const permission of selectObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (bot.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.botNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    /* if (interaction.message.interaction) {
      if (interaction.message.interaction.user.id !== interaction.user.id) {
        const rEmbed = new EmbedBuilder()
          .setColor(`${config.colors.redColor}`)
          .setDescription(`${config.messages.cannotUseSelect}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    } */

    await selectObject.run(client, interaction);
  } catch (err) {
    console.log(`An error occurred while validating select menus! ${err}`.red);
  }
};
