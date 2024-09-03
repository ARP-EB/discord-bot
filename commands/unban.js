const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'unban',
        description: 'Advanced unban command',
        usage: `/unban <user>`,
    },
    async run (bot,message,args) {
        // check if user has permission to ban
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to unban members.');
        }

        // get the user
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You must mention a user to unban.');
        }

        // check if user is a bot
        if (user.bot) {
            return message.reply('You cannot unban bots.');
        }

        // unban user
        message.guild.members.unban(user);

        // send message in logs channel
        const logsChannel = message.guild.channels.cache.find(channel => channel.name === '1278083919194882120');
        if (logsChannel) {
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('User Unbanned')
                .setDescription(`${user.tag} has been unbanned by ${message.author.tag}`)
                .setTimestamp();
            logsChannel.send({ embeds: [embed] });
        }
    }
}