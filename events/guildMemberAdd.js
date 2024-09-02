const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member, bot) {
        // Log the newly joined member to console
        console.log('User ' + member.user.tag + ' has joined the server!');

        // Create an embed
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Velkommen til serveren!')
        .setDescription(`Velkommen ${member.user.username}`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: "Se info hos:" + member.guild.channels.cache.find(c => c.id === "1278084736602079284").name });
    

        // Find a channel named welcome and send the embed
        member.guild.channels.cache.find(c => c.id === "1278084764913373184").send({ embeds: [embed] });
        
    }
};
