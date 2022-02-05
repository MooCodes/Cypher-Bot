exports.run = (client, message, args) => {
    // get guild cypher list
    let cyList = client.cypherLists.get(message.guild.id);

    if(cyList.running)
        return;

    if(!cyList.paused) {
        cyList.time = client.guildSettings[message.guild.id].maxTime;
    } else {
        cyList.paused = true;
    }

    let emojis = [":microphone:", ":headphones:", ":timer:", ":musical_note:"];

    // can't start if noone is in q
    if(!cyList.q[0])
        return message.channel.send("Use the `&add` command before you start.");

    cyList.running = true;
    
    message.member.voiceChannel.join().then(connection => {
        // play initial sound
        connection.player.streamingData.pausedTime = 0;

        if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.wav`))
            connection.playFile(`./sounds/${cyList.q[0].id}.wav`);
        else if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.mp3`)) 
            connection.playFile(`./sounds/${cyList.q[0].id}.mp3`);
        else if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.mp4`)) 
            connection.playFile(`./sounds/${cyList.q[0].id}.mp4`);
        else if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.m4a`)) 
            connection.playFile(`./sounds/${cyList.q[0].id}.m4a`);
        else
            connection.playFile(`./sounds/default.wav`);
        

        message.channel.send(`:vertical_traffic_light: ***GO*** :vertical_traffic_light: <@${cyList.q[0].id}>`);
        message.channel.send(`\`${cyList.time}\` **seconds remaining**`);

        cyList.interval = setInterval(() => {

            // 5 seconds have passed
            if(cyList.time != 0) 
                cyList.time -= 5;

            if(cyList.time == 0) {
                // next persons turn

                cyList.time = client.guildSettings[message.guild.id].maxTime;

                //give person seconds if > 1 person
                if(cyList.q.length > 1) {
                    client.scores[cyList.q[0].id].seconds += cyList.time;
                    client.fs.writeFile("./scores.json", JSON.stringify(client.scores, null, 4), (err) => {
                        if (err) console.error(err);
                    });
                }

                let temp = cyList.q.shift();
                cyList.q.push(temp);

                message.channel.send(`:vertical_traffic_light: ***GO*** :vertical_traffic_light: <@${cyList.q[0].id}>`);
                message.channel.send(`\`${cyList.time}\` **seconds remaining**`);
                
                connection.player.streamingData.pausedTime = 0;
                if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.wav`))
                    connection.playFile(`./sounds/${cyList.q[0].id}.wav`);
                else if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.mp3`)) 
                    connection.playFile(`./sounds/${cyList.q[0].id}.mp3`);
                else if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.mp4`)) 
                    connection.playFile(`./sounds/${cyList.q[0].id}.mp4`);
                else if (client.fs.existsSync(`./sounds/${cyList.q[0].id}.m4a`)) 
                    connection.playFile(`./sounds/${cyList.q[0].id}.m4a`);
                else
                    connection.playFile(`./sounds/default.wav`);

            } else {
                if(cyList.time == 5 && cyList.q.length > 1) {
                    // about to be next persons turn
                    message.channel.send(`\`${cyList.time}\`   **seconds remaining**`);
                    message.channel.send(`${emojis[Math.floor(Math.random() * emojis.length) + 0]} ***GET READY*** ${emojis[Math.floor(Math.random() * emojis.length) + 0]} <@${cyList.q[1].id}>`);
                } else 
                    message.channel.send(`\`${cyList.time}\` **seconds remaining**`);
            }

        }, 5000);
    });

}