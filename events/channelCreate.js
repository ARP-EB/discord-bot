const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: "channelCreate",
    execute(channel) {
        // log to console
        console.log(`A new channel was created: ${channel}`);

        const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("New channel")
            .setDescription(`A new channel was created: ${channel}`)
            .setTimestamp();

        // send message to log channel
        const logChannel = member.guild.channels.cache.get("1278083919194882120");
        if (logChannek && logChannel.type === ChannelType.GuildText) {
            logChannel.send({ embeds: [embed] }) 
                .catch(err => console.error('Failed to send message:', err)); 
        } else {
            console.log('Channel not found or is not a text channel!');
        }
    }
}