exports.run = (client, message, args) => {
    const util = require("../utility/containsObject.js");

    let cyList = client.cypherLists.get(message.guild.id);
    let user; 

    if(!args[0]) {
        // user adds themself
        user = {
            id: message.author.id,
            username: message.author.username
        }

        if(util.containsObject(user.id, cyList.q))
            return message.channel.send("*You are already in the Cypher!*");

        // add to db if not already in
        if(!client.scores[user.id]) {
            let scoreSchema = {
                id: user.id,
                seconds: 0
            };

            client.scores[message.author.id] = scoreSchema;

            client.fs.writeFile("./scores.json", JSON.stringify(client.scores, null, 4), (err) => {
                if (err) console.error(err);
            });
        }

    } else if(args[0]) {
        // user adds another user
        user = {
            id: message.mentions.users.first().id,
            username: message.mentions.users.first().username
        }

        if(util.containsObject(user.id, cyList.q)) 
            return message.channel.send(`*${user.username} is already in the Cypher!*`);

        // add to db if not already in
        if(!client.scores[user.id]) {
            let scoreSchema = {
                id: user.id,
                seconds: 0
            };

            client.scores[user.id] = scoreSchema;

            client.fs.writeFile("./scores.json", JSON.stringify(client.scores, null, 4), (err) => {
                if (err) console.error(err);
            });
        }
    }

    cyList.q.push(user);

    let listStr = "";

    for(let i = 0; i < cyList.q.length; i++) {

        listStr += `**${cyList.q[i].username}**\n`;
    }
    
    message.channel.send({embed: {
        color: 6666666,
        author: {
            name: "Cypher",
            icon_url: client.user.avatarURL
        },
        description: listStr
    }});
    message.channel.send(`*Added ${user.username} to the Cypher!*  :eyes:`);

}