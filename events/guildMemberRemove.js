const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',  // Event name
    execute(member) {
        // Log the event to the console
        console.log(`User ${member.user.tag} has left the server!`);

        // Create an embed to send in the channel
        const embed = new EmbedBuilder()
            .setColor('#FF5733')  // Set a color for the embed
            .setTitle('Vi ses igjen!')  // Title of the embed
            .setDescription(`Hade bra, ${member.user.username}!`)  // Custom goodbye message
            .setThumbnail(member.user.displayAvatarURL())  // User's avatar as the thumbnail
            .setTimestamp();  // Timestamp for when the embed is sent

        // Find the channel by ID and send the embed
        const channel = member.guild.channels.cache.get('1278084764913373184'); // Replace with your channel ID
        if (channel && channel.type === ChannelType.GuildText) {  // Check if the channel is a text channel
            channel.send({ embeds: [embed] })  // Send the embed in the channel
                .catch(err => console.error('Failed to send message:', err)); // Handle any errors
        } else {
            console.log('Channel not found or is not a text channel!');
        }
    }
};
