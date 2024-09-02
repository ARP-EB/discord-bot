const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove', 
    execute(member) {
        // Log the event to the console
        console.log(`User ${member.user.tag} has left the server!`);

        // Create an embed to send in the channel
        const embed = new EmbedBuilder()
            .setColor('#ff3b30') 
            .setTitle('Vi ses igjen!') 
            .setDescription(`Hade bra, ${member.user.username}!`)  
            .setThumbnail(member.user.displayAvatarURL())  
            .setTimestamp(); 

        // Find the channel by ID and send the embed
        const channel = member.guild.channels.cache.get('1278084764913373184');
        if (channel && channel.type === ChannelType.GuildText) {
            channel.send({ embeds: [embed] }) 
                .catch(err => console.error('Failed to send message:', err)); 
        } else {
            console.log('Channel not found or is not a text channel!');
        }
    }
};
