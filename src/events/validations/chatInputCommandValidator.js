require("colors");

const { EmbedBuilder } = require("discord.js");
const config = require("../../configs/config.js");
const getLocalCommands = require("../../utils/getLocalCommands");
const dbQuery = require("../../database/DBfunctions/validationsFunctions");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const allowedUsersIds = await dbQuery.GetAllowedUsers();

  const rEmbed = new EmbedBuilder().setColor(`${config.colors.redColor}`);

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );
    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!config.developement.developersID.includes(interaction.member.id)) {
        rEmbed.setDescription(`${config.messages.commandDevOnly}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (commandObject.testMode) {
      if (interaction.guild.id !== config.developement.devServerID) {
        rEmbed.setDescription(`${config.messages.commandTestMode}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (commandObject.userPermissions?.length) {
      for (const permission of commandObject.userPermissions) {
        if (interaction.member.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.userNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (bot.permissions.has(permission)) {
          continue;
        }
        rEmbed.setDescription(`${config.messages.botNoPermissions}`);
        interaction.reply({ embeds: [rEmbed], ephemeral: true });
        return;
      }
    }

    await commandObject.run(client, interaction);
  } catch (err) {
    console.log(`An error occurred while validating chat input commands! ${err}`.red);
  }
};
