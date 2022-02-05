exports.run = (client, message, args) => {

    // assume args[0] is txt ID
    if(args[0]) {
        // error handling
        if(isNaN(parseInt(args[0])))
            return message.channel.send("`Error`: *The channel ID should be a number.*");
        else if(parseInt(args[0]) % 5 != 0)
            return message.channel.send("`Error`: *The time must be divisible by 5.*");
        
        client.guildSettings[message.guild.id].maxTime = parseInt(args[0]);

        client.fs.writeFile("./guildSettings.json", JSON.stringify(client.guildSettings, null, 4), (err) => {
            if (err) console.error(err);
        });

        message.channel.send(`\`Success\`: The time has changed to ${args[0]}.`);
    } else {
        // assume they want to see which channel they're using.
        let output = `**Timer**: ${client.guildSettings[adminID].maxTime}`;
        message.channel.send(output);
    }

}