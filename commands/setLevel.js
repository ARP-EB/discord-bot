module.exports = {
    config: {
        name: 'setLevel',
        description: 'Sets the level of a user',
        usage: `/setlevel <user> <level>`,
    },
    async run (bot,message,args) {
        // get the user and level from the args
        const user = args[0];
        const level = args[1];

        // check if the user exists
        const userExists = dbCollections.users.findOne({ userID: user });
        if (!userExists) {
            message.channel.send('User does not exist');
            return;
        }

        // check if executor is admin
        if (!message.member.roles.cache.some(role => role.name === '1106667052292391032')) {
            message.channel.send('You are not an admin');
            return;
        }

        // set the level
        dbCollections.users.updateOne({ userID: user }, { $set: { level: level } });
        message.channel.send(`Set ${user}'s level to ${level}`);
    }
}