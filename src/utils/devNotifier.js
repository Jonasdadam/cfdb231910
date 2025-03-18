const { client } = require('../index');
const config = require('../configs/config');

async function sendToDevChannel(message) {
    try {
        const channel = await client.channels.fetch(config.devChannelId);
        await channel.send(message);
    } catch (error) {
        console.error('Fout bij het verzenden van bericht naar ontwikkelaarskanaal:', error);
    }
}

module.exports = { sendToDevChannel };
