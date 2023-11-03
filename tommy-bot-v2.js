const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const client = new CommandoClient();

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroups([
        ['custom', 'Custom Commands'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

const token = 'Nope';
const clientId = 'Nope';
const guildId = 'null'; // Set to null for global commands

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('error', console.error);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'hello') {
        await interaction.reply('Hello, world!');
    } else if (commandName === 'otherCommand') {
        // Implement the logic for your other commands here
        await interaction.reply('Response for otherCommand');
    }
});

client.login(token);

// Define and register slash commands using the REST API here
const commands = [
    {
        name: 'hello',
        description: 'Replies with a hello message.',
    },
    // Add definitions for your other slash commands here
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            guildId
                ? Routes.applicationGuildCommands(clientId, guildId)
                : Routes.applicationCommands(clientId),
            {
                body: commands,
            }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
