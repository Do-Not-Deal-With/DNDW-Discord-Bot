const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
require('moment-duration-format');

class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'util',
      memberName: 'info',
      aliases: ['stats'],
      description: 'Displays statistics about the bot.',
      clientPermissions: ['EMBED_LINKS'],
      throttling: {
        usages: 2,
        duration: 60,
      },
      guarded: true,
    });

    this.uptime = new Date();
  }

  run(msg) {
    const embed = new RichEmbed()
      .setColor(3447003)
      .setTitle('DNDW Bot Statistics')
      .addField(
        '❯ Uptime',
        moment.duration(this.client.uptime).format('d[d ]h[h ]m[m ]s[s]'),
        true
      )
      .addField(
        '❯ Memory Usage',
        `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        true
      )
      .addField(
        '❯ Contributors',
        stripIndents`
        • [@Debaucus](https://twitter.com/debaucus)
        ❯ Source Code:
				• [@luceos](https://github.com/luceos)
				• [@datitisev](https://github.com/datitisev)
			`,
        true
      )
      .addField('❯ Original Source Code', 'https://github.com/extiverse/bot', true)
      .setThumbnail('https://dndw.net/assets/avatars/dndw.png')
      .setFooter(`DNDW.net - Stopping Scammers.`);

    return msg.embed(embed);
  }
}

module.exports = StatsCommand;
