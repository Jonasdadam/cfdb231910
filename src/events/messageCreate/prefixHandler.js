const fs = require('fs');
const { Collection } = require('discord.js');
const prefix = "!"; // Voeg hier je prefix toe

module.exports = async (client, message) => {
// Negeer berichten die niet met de prefix beginnen of van bots komen
if (!message.content.startsWith(prefix) || message.author.bot) return;

// Verwijder de prefix en splits het bericht op spaties
const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

// Voorbeeld: 'ping' command
if (command === 'ping') {
  message.channel.send('Pong!');
}

// Voeg hier meer commando's toe
else if (command === 'hello') {
  message.channel.send(`Hallo ${message.author.username}!`);
}

};