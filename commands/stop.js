exports.run = (client, message, args) => {
    let cyList = client.cypherLists.get(message.guild.id);
    if(!cyList.running) return;

    clearInterval(cyList.interval);
    cyList.running = false;
    cyList.time = client.guildSettings[message.guild.id].maxTime;


    message.channel.send("*Cypher has stopped and reset.*");

    message.member.voiceChannel.leave();

}