require("colors");

module.exports = async (client) => {
  console.log(`[INFO] ${client.user.username} is online.\n`.blue);
};