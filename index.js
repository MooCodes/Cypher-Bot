const Discord = require("discord.js");
Discord.Guild.prototype.queue = [];
const client = new Discord.Client();
const fs = require("fs");
const ytdl = require("ytdl-core");
const config = require("./config.json");

// var usersDB = JSON.parse(fs.readFileSync("./users.json", "utf8"));

client.ytdl = ytdl;
client.fs = fs;
client.defaultTime = 45;

//Read the events folder
fs.readdir("./events/", (err, files) => {
    if(err) return console.error(err);
    
    files.forEach(file => {
        //Slick way to get the event's name and function name
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
      
        //call the event and and put in params as needed
        client.on(eventName, (...args) => {
            eventFunction.run(client, ...args); //need ..args for events like 'voiceStatusUpdate'
        });
    });
});

client.on("message", message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    let settings = client.guildSettings[message.guild.id];

    // if they have messed with the settings, and their msg isn't from or in the txt/vc channel
    if(settings.cypherTextID) {
        if(message.channel.id !== settings.cypherTextID || message.member.voiceChannelID !== settings.cypherVoiceID)
            return message.channel.send("`Error`: *You must use the correct voice/text channel.*");
    }
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // shortcut/similar commands
    shCommands = {
        'start': 'resume',
        'list': 'l',
        'add': 'a',
        'remove': 'r',
        'pause': 'p',
        'leaderboard': 'lb'
    };

    let dir = {
        'settings': ['vc', 'tc', 'admins', 'time']
    };
    
    try {
        let path = `./commands/${command}.js`;
        //Checks to see if the command exists
        if(fs.existsSync(path)){
            let commandFile = require(path);
            commandFile.run(client, message, args);
        } else {
            for(let key in shCommands) {
                if(shCommands[key] === command) {
                    require(`./commands/${key}.js`).run(client, message, args);
                    return;
                }
            }

            for(let key in dir) {
                // check if ele is array
                if(dir[key][1]) {
                    for(let i = 0; i < dir[key].length; i++) {
                        if(dir[key][i] === command) {
                            require(`./commands/${key}/${command}.js`).run(client, message, args);
                            return;
                        }
                    }
                }
            }
            
        }
    } catch (err) {
        console.log(err);
    
    }

});

client.login(config.token);
