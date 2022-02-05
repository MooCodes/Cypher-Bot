exports.run = (client, message, args) => {
    // secure command
    let adminID = client.guildSettings[message.guild.id].adminID;

    if(client.guildSettings[message.guild.id].adminSet && !message.member.roles.get(adminID))
        return;

    if(args[0]) {
        // assume args[0] is VC ID

        // error handling
        if(!message.mentions.roles.first())
            return message.channel.send("`Error`: *Please enter a role with the @ symbol.*");
        
        client.guildSettings[message.guild.id].adminID = message.mentions.roles.first().id;
        client.guildSettings[message.guild.id].adminSet = true;

        client.fs.writeFile("./guildSettings.json", JSON.stringify(client.guildSettings, null, 4), (err) => {
            if (err) console.error(err);

        message.channel.send("`Success`: *Changed the admin role.*");
        });
    } else {
        // assume they want to see which channel they're using.
        let output = `**Admin**: ${client.guildSettings[adminID].adminID}`;
        message.channel.send(output);
    }

}