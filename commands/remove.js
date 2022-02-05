exports.run = (client, message, args) => {
    const util = require("../utility/removeObject.js");

    var cyList = client.cypherLists.get(message.guild.id);
    let user; 

    if(!args[0]) {
        // user removes themself
        user = {
            id: message.author.id,
            username: message.author.username
        }

        if(util.removeObject(user.id, cyList.q)) 
            return message.channel.send(`${user.username} has been removed from the Cypher.`);

    } else if(args[0]) {
        // removes adds another user
        user = {
            id: message.mentions.users.first().id,
            username: message.mentions.users.first().username
        }

        if(util.removeObject(user.id, cyList.q)) 
            return message.channel.send(`${user.username} has been removed from the Cypher.`);
    }

}