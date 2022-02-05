exports.run = (client, message, args) => {
    let cyList = client.cypherLists.get(message.guild.id);
    if(cyList.running) return; // don't change sounds while we're running

    if(message.attachments.first()){//checks if an attachment is sent
        let ext = message.attachments.first().filename.substr(message.attachments.first().filename.length - 3);
        if(ext === 'wav' || ext === 'mp3' || ext === 'mp4' || ext === 'm4a') {
            // check if override
            if (client.fs.existsSync(`./sounds/${message.author.id}.wav`))
                client.fs.unlinkSync(`./sounds/${message.author.id}.wav`);
            else if (client.fs.existsSync(`./sounds/${message.author.id}.mp3`)) 
                client.fs.unlinkSync(`./sounds/${message.author.id}.mp3`);
            else if (client.fs.existsSync(`./sounds/${message.author.id}.mp4`)) 
                client.fs.unlinkSync(`./sounds/${message.author.id}.mp4`);
            else if (client.fs.existsSync(`./sounds/${message.author.id}.m4a`)) 
                client.fs.unlinkSync(`./sounds/${message.author.id}.m4a`);

            // download and then validate
            download(message.attachments.first().url, `./sounds/${message.author.id}.${ext}`, () => {
                setTimeout(() => { // wait to download
                    const { getAudioDurationInSeconds } = require('get-audio-duration')
 
                    // From a local path...
                    getAudioDurationInSeconds(`./sounds/${message.author.id}.${ext}`).then((duration) => {
                        if(duration.toFixed(0) > 7) {
                        
                            // delete file Synchronously
                            client.fs.unlinkSync(`./sounds/${message.author.id}.${ext}`);
                            return message.channel.send("`Error`: *Your custom sound must be 5 seconds or less.*");
                        }
                    })
                }, 1000)
            });
            
        }
    } else {
        if(args[0] === 'delete') {
            if (client.fs.existsSync(`./sounds/${message.author.id}.wav`))
                client.fs.unlinkSync(`./sounds/${message.author.id}.wav`);
            else if (client.fs.existsSync(`./sounds/${message.author.id}.mp3`)) 
                client.fs.unlinkSync(`./sounds/${message.author.id}.mp3`);
            else if (client.fs.existsSync(`./sounds/${message.author.id}.mp4`)) 
                client.fs.unlinkSync(`./sounds/${message.author.id}.mp4`);
            else if (client.fs.existsSync(`./sounds/${message.author.id}.m4a`)) 
                client.fs.unlinkSync(`./sounds/${message.author.id}.m4a`);
        }
    }

}

function download(url, filename, cb){
    let request = require(`request`);
    let fs = require('fs');
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(filename));

    cb();
}
