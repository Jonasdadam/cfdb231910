const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require("../../configs/config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Verwijder een specifiek aantal berichten.")
    .setDMPermission(false)
    .addNumberOption(option => option
        .setName('aantal')
        .setDescription(`Het aantal berichten dat verwijderd moet worden`)
        .setRequired(true)
    )
    .toJSON(),
  deleted: false,
  devOnly: false,
  testMode: false,
  userPermissions: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],

  run: async (client, interaction) => {
      const GivenAmount = interaction.options.getNumber('aantal');
      const AmountToDelete = Math.max(1, Math.min(GivenAmount || 0, 100));
    

        try {
            const FetchedMessages = await interaction.channel.messages.fetch({ limit: AmountToDelete });
            const DeletedMessages = await interaction.channel.bulkDelete(FetchedMessages, true);
        
            const DeletedResults = DeletedMessages.reduce((a, b) => {
                const SelectedUser = b.author.discriminator === '0' ? b.author.username : `${b.author.username}#${b.author.discriminator}`;
                a[SelectedUser] = (a[SelectedUser] || 0) + 1;
                return a;
            }, {});

            const purgeEmbed = new EmbedBuilder()
            .setColor(config.colors.mainColor)
            .setAuthor({
            name: `Bericht${DeletedMessages.size > 1 ? 'en' : ''} verwijderd`,
            iconURL: `${config.icons.deleteIcon}`,
            })
            .setFooter({ text: `${config.names.fullName}`, iconURL: `${config.icons.gangIcon}` })
            .setDescription(`${DeletedMessages.size} bericht${DeletedMessages.size > 1 ? 'en' : ''} verwijderd.\n\n${Object.entries(DeletedResults).map(([User, Messages]) => `__**${User}**__・${Messages}`).join('\n')}`)
            .setTimestamp();
        
            await interaction.reply({ embeds: [purgeEmbed], ephemeral: true });
        } catch (err) {
            await interaction.reply({ content: "Er is iets misgegaan! De fout is gemeld.", ephemeral: true });
        }
  },
};