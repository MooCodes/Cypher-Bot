exports.run = (client, message, args) => {
    let tempArr = [];
    for (let j in client.scores){
        let userSchema = {
            name: client.scores[j].id,
            seconds: client.scores[j].seconds
        }
        tempArr.push(userSchema);
    }

    //return;
    
    tempArr.sort(function(a, b) {
        return b.seconds - a.seconds;
    });
    
    
    let listStr = "";
    
    for(var i = 0; i < 10; i++){
        if(tempArr[i] !== undefined)
            listStr += "***" + (i+1) + ".***  <@" + tempArr[i].name + ">   `" + formatSeconds(tempArr[i].seconds) + "`\n";
        else
            break;
    }
    
    message.channel.send({embed: {
        color: 6666666,
        author: {
            name: "Cypher Leaderboards",
            icon_url: client.user.avatarURL
        },
        description: listStr
    }});
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