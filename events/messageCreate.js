const { EmbedBuilder } = require('discord.js');
const { connectToDatabase } = require('../dbclient.js');

let db;
let users;

(async () => {
    try {
        db = await connectToDatabase();
        users = db.collection('users'); // Ensure 'users' is defined
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
})();

module.exports = {
    name: 'messageCreate',
    async execute(message, bot) {
        // Log the message to console
        console.log('Message received: ' + message.content);

        // Filter out bad words
        const badWords = ['niger', 'nigger', 'nazi', "nig", "hitler", "kuk", "penis", "tiss"];
        const msgContent = message.content.toLowerCase();
        const badWordFound = badWords.some(word => msgContent.includes(word));

        if (badWordFound) {
            try {
                // Delete the message
                await message.delete();
                // Send a message to the channel
                await message.channel.send('Please do not use extreme profanity in this channel.');
            } catch (error) {
                console.error('Error deleting message or sending response:', error);
            }
            return; // Exit early if a bad word is found
        }

        const userId = message.author.id;

        // Retrieve the user document from the database
        let user = await users.findOne({ userId });

        // If the user doesn't exist, create a new document
        if (!user) {
            user = {
                userId: userId,
                level: 0,
                xp: 0
            };
        }

        // Increment the user's XP (random amount between 10 and 30)
        user.xp += Math.floor(Math.random() * (30 - 10 + 1)) + 10;

        // Define XP thresholds for each level
        const xpThresholds = [0, 500, 1000, 2500, 5000, 10000, 20000, 40000, 80000, 100000, 160000, 320000, 640000, 800000, 1000000];

        // Check for level up
        let newLevel = user.level;
        while (newLevel < xpThresholds.length - 1 && user.xp >= xpThresholds[newLevel + 1]) {
            newLevel++;
        }

        if (newLevel > user.level) {
            // Update the user's level
            user.level = newLevel;

            // Create an embed message
            const levelUpEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Level Up!')
                .setDescription(`${message.author.username} has leveled up! New level: ${user.level.toString()}`)
                .setTimestamp()
                .setFooter({ text: 'Keep chatting to level up!' });

            // Send the embed to the channel
            await message.channel.send({ embeds: [levelUpEmbed] });
        }

        // Update the database with the new user data
        await users.updateOne(
            { userId: userId },
            { $set: { level: user.level, xp: user.xp } },
            { upsert: true } // Create the document if it does not exist
        );
    }
};
