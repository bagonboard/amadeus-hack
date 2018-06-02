const bodyParser = require('body-parser');
const app        = require('express')();
const routes     = require('../src/routes');

module.exports = initServer;

async function initServer(Config) {
  console.info(':: Init server ::');
  try {
    const { hostname, port } = Config.server;
    app.use(bodyParser.json({
      limit: '1mb',
    }));
    /* Setup endpoints */
    routes(app);
    /* Bind the server */
    await app.listen(port, hostname);
    console.info(`:: Server ready on  ${hostname}:${port} ::`);
  } catch (error) {
    console.error(':: ERROR - Server fail ::', error);
    throw error;
  }
  return true;
}
