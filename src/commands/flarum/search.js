const { Command } = require('discord.js-commando');
const { discuss } = require('../../api');

module.exports = class DiscussCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'search',
      group: 'flarum',
      memberName: 'search',
      description: 'Search reports on DNDW.net and check too see who you are dealing with.',
      format: 'search @DiscordTag/ID',
      examples: ['#dndw search @DiscordTag/ID'],
      throttling: {
        usages: 10,
        duration: 60,
      },
    });
  }

  async run(msg) {
    const [action, ...args] = msg.content.replace(/[<>@#&!]/g, '').toLowerCase().split(' ').slice(1);

    if (!action || !args.length || !this[action])
      return msg.reply(this.usage(this.format));

    return this[action](msg, args.join(' '));
  }

  async search(msg, q) {
    //await msg.channel.startTyping();

    return discuss
      .get(`/api/discussions`, {
        'filter[q]': q,
        'page[limit]': 5,
      })
      .then(async ({ data: discussions, ttl }) => {
        await msg.channel.stopTyping();

        return msg.embed({
          title: `Scam reports for '${q}'.`,
          url: `${discuss.base}/?q=${encodeURIComponent(q)}`,
          color: 13632027,
          author: {
            name: 'DNDW.net Scam Reports',
            url: discuss.base,
            icon_url: 'https://dndw.net/assets/avatars/dndw.png',
          },
          fields: discussions.map((d) => ({
            name: d.title,
            value: `[${d.commentCount} Comments, View Report](${discuss.base}/d/${d.id})`,
          })),
          footer: {
            text: !discussions.length
              ? 'No results found for your search.'
              : ttl,
          },
        });
      });
  }
};
