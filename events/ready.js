module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        // Log Bot's username and the amount of servers its in to console
        console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} server!`);

        // Set the Presence of the bot user to show 'Playing: My code'
        bot.user.setPresence({ activities: [{ name: 'ARP 2024 AUTUMN'}] });
    }
}