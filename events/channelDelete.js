const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: "channelDelete",
    execute(channel) {
        // log to console
        console.log(`A channel was deleted: ${channel}`);

        const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("Deleted channel")
            .setDescription(`A channel was deleted: ${channel}`)
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