exports.run = (client, message, args) => {
    let cyList = client.cypherLists.get(message.guild.id);
    if(!cyList.running) return;
    cyList.running = false;
    cyList.paused = true;
    clearInterval(cyList.interval);

    return message.channel.send("*The Cypher has paused.*");
    message.member.voiceChannel.leave();
}
