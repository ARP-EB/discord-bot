const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'leaderboard',
        description: 'Get the level leaderboard',
        usage: `/leaderboard`,
    },
    async run (bot,message,args) {
        // find the 10 highest leveled users
        const users = dbCollections.users.find().sort({ level: -1 }).limit(10);
        // send the leaderboard as embed using embedbuilder
        const embed = new EmbedBuilder()
        .setTitle('Level Leaderboard')
        .setDescription(`${users.map(user => `**${user.userID}** - Level ${user.level}`).join('\n')}`)
        .setColor('#0099ff')

        // send the embed
        message.channel.send({ embeds: [embed] });
    }
}