require('dotenv').config();
  const Commando = require('discord.js-commando');
  const path = require('path');
  const consola = require('consola');
  const log = consola.withScope('discord');
  const Discord = require ('discord.js');
  const { MessageEmbed } = require('discord.js');
  const { discuss } = require('./api');
  const fs = require('fs');

  const client = new Commando.Client({
    commandPrefix: '#dndw',
    owner: process.env.BOT_OWNER && process.env.BOT_OWNER.split(/, ?/),
    disableEveryone: true,
    nonCommandEditable: true,
    unknownCommandResponse: false,
  });

  const eventsDir = path.join(__dirname, "events");
  const eventsFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.js'));

  for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
      help: false,
    })
    .registerGroups([
      ['flarum', 'DNDW.net Scam Search'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

  client.on('warn', log.warn.bind(log));
  client.on('error', console.error);
  client.on('debug', console.log);

  client.login(process.env.BOT_TOKEN).then(() => {
    (client);
  });
