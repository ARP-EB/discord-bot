module.exports = {
    config: {
        name: 'level',
        description: 'Get your level',
        usage: `/level`,
    },
    async run (bot,message,args) {
        // get the user and look in mongodb for level
        const user = dbCollections.users.findOne({ userID: message.author.id });
        if (!user) {
            message.channel.send('You have not started yet!');
            return;
        }
        message.channel.send(`You are level ${user.level} with ${user.xp} xp!`);
        return;
    }
}