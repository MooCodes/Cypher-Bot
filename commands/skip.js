exports.run = (client, message, args) => {
	let cyList = client.cypherLists.get(message.guild.id);
	if(cyList.q[1]) {
		let temp = cyList.q.shift();
                cyList.q.push(temp);
	}
	return message.channel.send(`*Skipped*`);
}
