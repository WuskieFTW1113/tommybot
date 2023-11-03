const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient();

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroups([
        ['custom', 'Custom Commands'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

const token = 'Rather Not';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('error', console.error);

// You should have separate JavaScript files for each of the following commands in the "commands" folder:
// - cmds
// - anticheat
// - serverrules
// - limits
// - createserver
// - servercmdline
// - serverconfig
// - servermanual
// - serverlist
// - portfw
// - hello

client.login(token);
