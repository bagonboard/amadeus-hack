const bodyParser = require('body-parser');
const app        = require('express')();
const routes     = require('../src/routes');
const favicon    = require('serve-favicon');
const path       = require('path');

module.exports = initServer;

async function initServer(Config) {
  console.info(':: Init server ::');
  try {
    const { hostname, port } = Config.server;
    app.use(favicon(path.join(Config.root, 'client', 'favicon.ico')));
    app.get('/', (req, res) => res.send('hello world! amadeus hack'));
  
    app.use(bodyParser.json({
      limit: '1mb',
    }));
    /* Setup endpoints */
    routes(app);
    /* Bind the server */
    await app.listen(port, () => console.log(`Listening on ${ port }`));
    // console.info(`:: Server ready on  ${hostname}:${port} ::`);
  } catch (error) {
    console.error(':: ERROR - Server fail ::', error);
    throw error;
  }
  return true;
}
