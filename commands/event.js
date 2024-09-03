const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'event',
        description: 'Get the current event',
        usage: `/event`,
    },
    async run (bot,message,args) {
        // define event (im lazy)
        const event_name = "ARP 2024 AUTUMN";
        const event_date = "04/10/2024";
        const event_time = "17:00 PM";
        const event_location = "Vestneshallen";
        const website = "https://arp-lan.com/";

        // make embed
        const embed = new EmbedBuilder()
        .setTitle(event_name)
        .setDescription(`${event_date} at ${event_time} at ${event_location}`)
        .setURL(website)
        .setColor

        // send the embed
        message.channel.send({ embeds: [embed] });
    }
}