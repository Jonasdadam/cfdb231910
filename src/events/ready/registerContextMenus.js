require("colors");

const config = require("../../configs/config.js");
const getApplicationContextMenus = require("../../utils/getApplicationCommands");
const getLocalContextMenus = require("../../utils/getLocalContextMenus");

module.exports = async (client) => {
  try {
    // Retrieving all the local commands from the filesystem.
    const localContextMenus = await getLocalContextMenus();
    let applicationContextMenus;

    for (const localContextMenu of localContextMenus) {
      const { data } = localContextMenu;

      const contextMenuName = data.name;
      const contextMenuType = data.type;

      if (localContextMenu.testMode || localContextMenu.devOnly) {
        applicationContextMenus = await getApplicationContextMenus(client, config.developement.devServerID);
      } else {
        applicationContextMenus = await getApplicationContextMenus(client);
      }

      const existingContextMenu = await applicationContextMenus.cache.find(
        (cmd) => cmd.name === contextMenuName
      );

      if (existingContextMenu) {
        if (localContextMenu.deleted) {
          await applicationContextMenus.delete(existingContextMenu.id);
          console.log(
            `Application command ${contextMenuName} has been deleted.`.red
          );
          continue;
        }
      } else {
        if (localContextMenu.deleted) {
          console.log(
            `Application command ${contextMenuName} has been skipped, since property "deleted" is set to "true".`
              .grey
          );
          continue;
        }

        await applicationContextMenus.create({
          name: contextMenuName,
          type: contextMenuType,
        });
        console.log(
          `Application command ${contextMenuName} has been registered.`.green
        );
      }
    }
  } catch (err) {
    console.log(
      `An error occurred while registering context menu's! ${err}`.red
    );
  }
};