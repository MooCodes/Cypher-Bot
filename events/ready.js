exports.run = (client) => {
    console.log('ready');

    client.guildSettings = JSON.parse(client.fs.readFileSync("./guildSettings.json", "utf8"));
    client.scores = JSON.parse(client.fs.readFileSync("./scores.json", "utf8"));
    client.cypherLists = new Map();

    // everything there is to know about a guilds' cypher list
    // create cypher queue  for each guild we're in
    client.guilds.forEach(guild => {
        let cypherList = {
            q: [],
            time: client.defaultTime,
            running: false,
            paused: false
        };

        client.cypherLists.set(guild.id, cypherList);
    });
}