const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('Stop Discord Scammers');

		let channel = client.channels.cache.find(channel => channel.name.toLowerCase() === "chat")

		//Vote Notification
        setInterval(function() {
            channel.send(
				new MessageEmbed()
                .addField('Vote for DNDW', 'Voting allows the server to grow and help us stop scammers! You can do this once every 12 hours.')
        		.addField('Top.gg Vote Link', 'https://top.gg/servers/834868131804479541/vote')
        		.setColor(13632027)
        		.setThumbnail('https://dndw.net/assets/avatars/dndw.png')
  		    	.setFooter(`DNDW.net - Stopping Scammers`)
            );
        }, (1000 * 60 * 750));

		//Bump Notification
		setInterval(function() {
			channel.send(
			  new MessageEmbed()
				.addField('!d bump', 'Type "!d bump" to bump the discord server and help us grow! This message is sent once every 2 hours.')
				.addField('Thank you for Bumping!', ':heart:')
				.setColor(13632027)
				.setThumbnail('https://dndw.net/assets/avatars/dndw.png')
				.setFooter(`DNDW.net - Stopping Scammers`)
			);
		  }, (1000 * 60 * 125));

	},
};