exports.run = (client, oldMember, newMember) => {
    if(client.guildSettings[oldMember.guild.id].cypherVoiceID) {
        if(oldMember.voiceChannel){
            if(oldMember.voiceChannel.id === client.guildSettings[oldMember.guild.id].cypherVoiceID) {
                //if left cypher room
                if(!newMember.voiceChannel || newMember.voiceChannel.id !== client.guildSettings[oldMember.guild.id].cypherVoiceID) {
                    let cyList = client.cypherLists.get(oldMember.guild.id);
                    const util = require("../utility/removeObject.js");
                    if(cyList.q[0]) {
                        if(cyList.q[0].id === oldMember.user.id && cyList.running){
                            if(util.removeObject(oldMember.user.id, cyList.q)) {
                                oldMember.guild.channels.get(`${client.guildSettings[oldMember.guild.id].cypherTextID}`)
                                .send(`\`${oldMember.user.username}\` *has left and is being removed from the cypher* `);
                                cyList.time = 0;
                            }
                        }

                        if(!cyList.q[0] && cyList.running) {
                            // if it's the last person in the cypher that is leaving
                            clearInterval(cyList.interval);
                            cyList.running = false;
                            cyList.time = client.guildSettings[oldMember.guild.id].maxTime;

                            oldMember.voiceChannel.leave();
                        }
                    }
                }
            }
        }
    }
}

