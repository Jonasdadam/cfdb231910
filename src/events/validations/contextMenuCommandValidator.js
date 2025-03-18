require("colors");

const { EmbedBuilder } = require("discord.js");
const config = require("../../configs/config.js");
const getLocalContextMenus = require("../../utils/getLocalContextMenus");
const dbQuery = require("../../database/DBfunctions/validationsFunctions");

module.exports = async (client, interaction) => {
  if (!interaction.isContextMenuCommand()) return;

  const allowedUsersIds = await dbQuery.GetAllowedUsers();

  const rEmbed = new EmbedBuilder().setColor(`${config.colors.redColor}`);

  const localContextMenus = getLocalContextMenus();

  try {
    const menuObject = localContextMenus.find(
      (cmd) => cmd.data.name === interaction.commandName
    );
    if (!menuObject) return;

    if (menuObject.devOnly) {
      if (!config.developement.developersID.includes(interaction.member.id)) {
        rEmbed.setDescription(`${config.messages.commandDevOnly}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (menuObject.testMode) {
      if (interaction.guild.id !== config.developement.devServerID) {
        rEmbed.setDescription(`${config.messages.commandTestMode}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (menuObject.userPermissions?.length) {
      for (const permission of menuObject.userPermissions) {
        if (interaction.member.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.userNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (menuObject.botPermissions?.length) {
      for (const permission of menuObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (bot.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.botNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    await menuObject.run(client, interaction);
  } catch (err) {
    console.log(`An error occurred while validating context menu's! ${err}`.red);
  }
};
