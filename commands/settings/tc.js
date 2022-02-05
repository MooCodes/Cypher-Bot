exports.run = (client, message, args) => {
    // secure command
    let adminID = client.guildSettings[message.guild.id].adminID;

    if(adminID && !message.member.roles.get(adminID))
        return;

    // assume args[0] is txt ID
    if(args[0]) {
        // error handling
        if(isNaN(parseInt(args[0])))
            return message.channel.send("Error: The Cypher text channel ID should be a number.");
        
        client.guildSettings[message.guild.id].cypherTextID = args[0];

        client.fs.writeFile("./guildSettings.json", JSON.stringify(client.guildSettings, null, 4), (err) => {
            if (err) console.error(err);
        });

        message.channel.send("`Success`: *Changed the Cypher text channel.*");
    } else {
        // assume they want to see which channel they're using.
        let output = `**TC**: ${client.guildSettings[adminID].cypherTextID}`;
        message.channel.send(output);
    }

}