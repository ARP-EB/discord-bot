const { connectToDatabase } = require('../dbclient.js');

let db;
let users;

(async () => {
    try {
        db = await connectToDatabase();
        users = db.collection('users'); // Ensure 'users' is defined
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
})();

module.exports = {
    config: {
        name: 'level',
        description: 'Get your level',
        usage: `/level`,
    },
    async run (bot, message, args) {
        try {
            // Await the user lookup
            const user = await users.findOne({ userID: message.author.id });

            // Check if the user exists
            if (!user) {
                message.channel.send('You have not started yet!');
                return;
            }

            // Send user level and XP
            message.channel.send(`You are level ${user.level} with ${user.xp} xp!`);
        } catch (error) {
            console.error('Error fetching user data:', error);
            message.channel.send('There was an error retrieving your level.');
        }
    }
}
