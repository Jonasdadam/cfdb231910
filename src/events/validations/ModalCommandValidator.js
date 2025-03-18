require("colors");

const { EmbedBuilder } = require("discord.js");
const config = require("../../configs/config.js");
const getModals = require("../../utils/getModals");
const dbQuery = require("../../database/DBfunctions/validationsFunctions");

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  const allowedUsersIds = await dbQuery.GetAllowedUsers();

  const rEmbed = new EmbedBuilder().setColor(`${config.colors.redColor}`);

  const modals = getModals();

  try {
    const modalObject = modals.find(
      (modal) => modal.customId === interaction.customId
    );
    if (!modalObject) return;

    if (modalObject.devOnly) {
      if (!config.developement.developersID.includes(interaction.member.id)) {
        rEmbed.setDescription(`${config.messages.commandDevOnly}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (modalObject.testMode) {
      if (interaction.guild.id !== config.developement.devServerID) {
        rEmbed.setDescription(`${config.messages.commandTestMode}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (modalObject.userPermissions?.length) {
      for (const permission of modalObject.userPermissions) {
        if (interaction.member.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.userNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (modalObject.botPermissions?.length) {
      for (const permission of modalObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (bot.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.botNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    await modalObject.run(client, interaction);
  } catch (err) {
    console.log(`An error occurred while validating modal commands! ${err}`.red);
  }
};
