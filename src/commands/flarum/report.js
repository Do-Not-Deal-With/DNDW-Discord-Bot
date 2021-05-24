const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

class ReportCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'report',
      group: 'flarum',
      memberName: 'report',
      description: 'Report a user on DNDW.net so they are in the database in order to stop future scams.',
      clientPermissions: ['EMBED_LINKS'],
      throttling: {
        usages: 1,
        duration: 60,
      },
      guarded: true,
    });
  }

  run(msg, args) {
    return msg.embed(
      new MessageEmbed()
        .setTitle('How to Report a Scammer/Scam')
        .addField('❯ Evidence and Discord Tag/ID', 'With evidence, post a report on DNDW.net and include the details related to the scam.')
        .addField('❯ Where do I post the scam?', 'https://dndw.net/t/do-not-deal-with')
        .addField('❯ Where do I get a scammers Discord ID?', 'Guide here for PC and Mobile - https://dndw.net/d/19-guide-how-to-get-a-discord-users-unique-id-pc-and-mobile')
        .setColor(13632027)
        .setThumbnail('https://dndw.net/assets/avatars/dndw.png')
        .setFooter(`DNDW.net - Stopping Scammers`)
    );
  }
}

module.exports = ReportCommand;
