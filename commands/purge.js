const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'purge',
        description: 'Purge command',
        usage: `/purge <number>`,
    },
    async run(bot, message, args) {
        // Check if user is admin or mod
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply('You do not have permission to kick members.');
        }

        // Get the number of messages to purge
        const numMessages = parseInt(args[0]);
        if (isNaN(numMessages) || numMessages < 1 || numMessages > 100) {
            return message.reply('You must specify a number between 1 and 100.');
        }

        // Purge messages
        message.channel.bulkDelete(numMessages)
            .then(async messages => {
                message.channel.send(`Purged ${messages.size} messages.`);
                console.log(`Purged ${messages.size} messages.`);

                // Send message in logs channel
                const logsChannel = message.guild.channels.cache.get('1278083919194882120');
                if (logsChannel) {
                    const embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle('Messages Purged')
                        .setDescription(`${message.author.tag} has purged ${messages.size} messages in ${message.channel.name}`)
                        .setTimestamp();

                    await logsChannel.send({ embeds: [embed] });  // Sending the embed correctly
                }
            })
            .catch(error => {
                console.log('Error purging messages:', error);
            });
    }
}
