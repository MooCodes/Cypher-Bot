exports.run = (client, message, args) => {
    // secure command
    let adminID = client.guildSettings[message.guild.id].adminID;

    if(adminID && !message.member.roles.get(adminID))
        return;

    if(args[0]) {
        // assume args[0] is VC ID

        // error handling
        if(isNaN(parseInt(args[0])))
            return message.channel.send("`Error`: *The Cypher voice channel ID should be a number.*");
        
        client.guildSettings[message.guild.id].cypherVoiceID = args[0];

        client.fs.writeFile("./guildSettings.json", JSON.stringify(client.guildSettings, null, 4), (err) => {
            if (err) console.error(err);
        });

        message.channel.send("`Success`: *Changed the Cypher voice channel.*");
    } else {
        // assume they want to see which channel they're using.
        let output = `**VC**: ${client.guildSettings[adminID].cypherVoiceID}`;
        message.channel.send(output);
    }

}