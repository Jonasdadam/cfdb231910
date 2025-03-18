require("colors");

const config = require("../../configs/config.js");
const commandComparing = require("../../utils/commandComparing");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {

    // Retrieving all the local commands from the filesystem.
    const localCommands = await getLocalCommands();
    let applicationCommands;

    for (const localCommand of localCommands) {
      const { data, deleted } = localCommand;

      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      } = data;

      
      if (localCommand.testMode || localCommand.devOnly) {
        applicationCommands = await getApplicationCommands(client, config.developement.devServerID);
      } else {
        applicationCommands = await getApplicationCommands(client);
      }

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === commandName
      );


      if (deleted) {
        if (existingCommand) {
          await applicationCommands.delete(existingCommand.id);
          console.log(
            `[COMMAND REGISTERY] Application command ${commandName} has been deleted.`
              .red
          );
        } else {
          console.log(
            `[COMMAND REGISTERY] Application command ${commandName} has been skipped, since property "deleted" is set to "true".`
              .grey
          );
        }
      } else if (existingCommand) {
        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name: commandName,
            description: commandDescription,
            options: commandOptions,
          });
          console.log(
            `[COMMAND REGISTERY] Application command ${commandName} has been edited.`
              .yellow
          );
        }
      } else {
        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        });
        console.log(
          `[COMMAND REGISTERY] Application command ${commandName} has been registered.`
            .green
        );
      }
    }
  } catch (error) {
    console.log(
      `[ERROR] An error occurred inside the command registery:\n${error}`.red
    );
  }
};