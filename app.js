const { prefix, token } = require("./config.json");
const fs = require("fs");
const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { connectToDatabase } = require('./dbclient.js');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User
    ]
});

async function startBot() {
    // Create a collection to store commands inside the bot object
    bot.commands = new Collection();

    // Load Command files from commands folder
    const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const props = require(`./commands/${file}`);
        console.log(`${file} loaded`);
        bot.commands.set(props.config.name, props);
    }

    // Get folders inside commands folder
    const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'));
    commandSubFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'));
        for (const file of commandFiles) {
            const props = require(`./commands/${folder}/${file}`);
            console.log(`${file} loaded from ${folder}`);
            bot.commands.set(props.config.name, props);
        }
    });

    // Load Event files from events folder
    const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args, bot));
        } else {
            bot.on(event.name, (...args) => event.execute(...args, bot));
        }
    }

    // Connect to the database
    const dbCollections = await connectToDatabase();

    // Run when bot receives messageCreate event
    bot.on("messageCreate", async message => {
        // Check if author is a bot or the message was sent in dms and return
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        // Get prefix from config and prepare message
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        // Check that the message starts with the prefix
        if(!cmd.startsWith(prefix)) return;

        // Get command from command collection and run it
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot, message, args, dbCollections); // Pass dbCollections here
    });

    // Log in to Discord
    bot.login(token);
}

// Start the bot
startBot();
