exports.run = (client, message, args) => {
    let cyList = client.cypherLists.get(message.guild.id);
    console.log(message.guild.id);
    let listStr = "";

    for(var i = 0; i < cyList.q.length; i++) {

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
}