const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class InviteLink extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'util',
      memberName: 'invite',
      description: 'Displays an invite link for the bot.',
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
      new RichEmbed()
        .addField('Invite Link', 'https://dndw.net/invite-bot')
        .addField('Website', 'https://dndw.net')
        .addField('Discord Server', 'https://discord.gg/6bGTKH2yaj')
        .setColor(13632027)
        .setThumbnail('https://dndw.net/assets/avatars/dndw.png')
        .setFooter(`DNDW.net - Stopping Scammers`)
    );
  }
}

module.exports = InviteLink;
