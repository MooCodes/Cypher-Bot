exports.run = (client, message, args) => {
    let adminID = client.guildSettings[message.guild.id].adminID;

    if(!message.member.roles.get(adminID))
        return;

    let cyList = client.cypherLists.get(message.guild.id);

    cyList.q = [];

    message.channel.send("*Cleared the Cypher.*");
}