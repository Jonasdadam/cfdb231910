const config = require('../configs/config');

async function sendToDevChannel(message) {
    try {
        const channel = await client.channels.fetch(config.developement.mysqlNotifierChannelID);
        if (channel) {
            await channel.send(message);
        } else {
            console.error('Ontwikkelaarskanaal niet gevonden.');
        }
    } catch (error) {
        console.error('Fout bij het verzenden van bericht naar ontwikkelaarskanaal:', error.message);
    }
}

module.exports = { sendToDevChannel };
