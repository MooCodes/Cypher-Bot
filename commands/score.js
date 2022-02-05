exports.run = (client, message, args) => {
    if(!args[0])
        return message.channel.send(`${message.author.username} has cyphered a total of \`${formatSeconds(client.scores[message.author.id].seconds)}\``);
    else {
        return message.channel.send(`${message.mentions.users.first().username} has cyphered a total of \`${formatSeconds(client.scores[message.mentions.users.first().id].seconds)}\``);
    }
}

function formatSeconds(seconds){
    var totalNumberOfSeconds = seconds;
    var hours = parseInt( totalNumberOfSeconds / 3600 );
    var minutes = parseInt( (totalNumberOfSeconds - (hours * 3600)) / 60 );
    var seconds = Math.floor((totalNumberOfSeconds - ((hours * 3600) + (minutes * 60))));
    var result;
    
    if(hours === 0){
        result = (minutes < 10 ? "0" + minutes : minutes) + "m " + (seconds  < 10 ? "0" + seconds : seconds) + "s";
    } else {
        result = hours + "h " + (minutes < 10 ? "0" + minutes : minutes) + "m " + (seconds  < 10 ? "0" + seconds : seconds) + "s";
    }
    
    return result;
}