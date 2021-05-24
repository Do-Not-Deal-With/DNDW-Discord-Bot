const { discuss } = require('../api');

module.exports = {
	name: 'guildMemberAdd',
	on: true,
	execute(member) {
		console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
		//member.guild.channels.cache.find(c => c.name === "chat").send(`"${member.user.username}" has joined this server ID:${member.user.id}`);

		q = member.user.id;

		return discuss
		.get(`/api/discussions`, {
		'filter[q]': q,
		'page[limit]': 5,
		})
		 .then(async ({ data: discussions, ttl }) => {
		
		return member.guild.channels.cache.find(c => c.name === "chat").send({embed: {
		  title: `New User Scam Check for '${member.user.username}'.`,
		  url: `${discuss.base}/?q=${encodeURIComponent(q)}`,
		  color: 13632027,
		  author: {
			name: '❯ New User Scam Check',
			url: discuss.base,
			icon_url: 'https://dndw.net/assets/avatars/dndw.png',
		  },
		  fields: discussions.map((d) => ({
			name: d.title,
			value: `[${d.commentCount} Comments, View Report](${discuss.base}/d/${d.id})`,
		  })),
		  footer: {
			text: !discussions.length
			  ? 'No results found for your check.'
			  : ttl,
		  },
		}});
		});
	},
};
