const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: "guildBanRemove",
    execute(member) {
        // Log event to console
        console.log(`User ${member.user.tag} was unbanned from the server!`);

        // create embed
        const embed = new EmbedBuilder()
            .setColor('#ff3b30')
            .setTitle('Unbanned!')
            .setDescription(`User, ${member.user.username} was unbanned!`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        // get channel and post message
        const channel = member.guild.channel.cache.get("1278083919194882120");
        if (channel && channel.type === ChannelType.GuildText) {
            channel.send({ embeds: [embed] }) 
                .catch(err => console.error('Failed to send message:', err)); 
        } else {
            console.log('Channel not found or is not a text channel!');
        }
    }
};