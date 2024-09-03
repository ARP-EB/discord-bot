const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'ban',
        description: 'Advanced ban command',
        usage: `/ban <user> <reason>`,
    },
    async run (bot,message,args) {
        // check if user has permission to ban
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to ban members.');
        }

        // get the user
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You must mention a user to ban.');
        }

        // check if user is a bot
        if (user.bot) {
            return message.reply('You cannot ban bots.');
        }

        // check if user is a admin
        if (user.permissions.has('ADMINISTRATOR')) {
            return message.reply('You cannot ban admins.');
        }

        // check if user is a mod
        if (user.permissions.has('MODERATE_MEMBERS')) {
            return message.reply('You cannot ban mods.');
        }

        // get reason
        const reason = args.slice(1).join(' ');
        if (!reason) {
            return message.reply('You must provide a reason for the ban.');
        }

        // ban user
        message.guild.members.ban(user, { reason: reason });

        // send message in logs channel
        const logsChannel = message.guild.channels.cache.find(channel => channel.name === '1278083919194882120');

        if (logsChannel) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('User Banned')
                .setDescription(`**User:** ${user.tag}\n**Reason:** ${reason}`)
                .setTimestamp();
            
            logsChannel.send({ embeds: [embed] });
        }
    }
}