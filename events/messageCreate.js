const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    execute(member, bot) {
        // Log the message to console
        console.log('Message received: ' + member.content);

        // Filter out bad words
        const badWords = ['niger', 'nigger', 'nazi', "nig", "hitler", "kuk", "penis", "tiss"];
        const message = member.content.toLowerCase();
        const badWordFound = badWords.some(word => message.includes(word));
        if (badWordFound) {
            // Delete the message
            member.delete();
            // Send a message to the channel
            member.channel.send('Please do not use extreme profanity in this channel.');
        }
        
        // Add +12 xp to the user
        const user = dbCollections.users.findOne({ userID: member.id });
        if (!user) {
            dbCollections.users.insertOne({
                userID: member.id,
                xp: 12,
                level: 1
            });
        } else {
            dbCollections.users.updateOne({ userID: member.id }, { $inc: { xp: 12 } });
        }
    }
};
