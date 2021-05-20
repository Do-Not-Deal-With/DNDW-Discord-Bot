const API = require('./API');

module.exports = {
  discuss: new API(
    'flarum',
    'https://dndw.net'
  ),
};
