const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'kick',
        description: 'Advanced kick user',
        usage: `/user`,
    },
    async run (bot,message,args) {
        // check if user is admin or mod
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply('You do not have permission to kick members.');
        }

        // get the user
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply("You must mention a user to kick.");
        }

        // check if user is a bot
        if (user.bot) {
            return message.reply("You cannot kick bots.");
        }

        // check if user is a admin or moderator
        if (user.permissions.has('ADMINISTRATOR') || user.permissions.has('MODERATE_MEMBERS')) {
            return message.reply("You cannot kick admins or moderators.");
        }

        // kick user
        message.guild.members.kick(user);

        // send message in logs channel
        const logsChannel = message.guild.channels.cache.find(channel => channel.name === '1278083919194882120');
        if (logsChannel) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle
                .setDescription(`${user.tag} has been kicked by ${message.author.tag}`)
                .setTimestamp();
            
            logsChannel.send({ embeds: [embed] });
            
        }
    }
}