exports.run = (client, guild) => {
    console.log('Guild Created!');

    // JSON guild settings that we need every restart
    let settings = {
        id: guild.id,
        cypherVoiceID: "",
        cypherTextID: "",
        adminSet: false,
        adminID: "",
        maxTime: client.defaultTime
    };

    // save new guild settings if not already there
    if(!client.guildSettings[guild.id]) {
        client.guildSettings[guild.id] = settings;
        client.fs.writeFile("./guildSettings.json", JSON.stringify(client.guildSettings, null, 4), (err) => {
            if (err) console.error(err);
        });
    }

    // create new guild cypher list
    let cypherList = {
        q: [],
        time: client.defaultTime,
        running: false
    };

    client.cypherLists.set(guild.id, cypherList);
    console.log(client.cypherLists.get(guild.id));
    
}