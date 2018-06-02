const amadeusEndpoints = require('./amadeus');
import favicon from 'serve-favicon';
import path from 'path';

module.exports = (app) => {
  app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  app.get('/', (req, res) => res.send('hello world! amadeus hack'));
  [
    {
      endpoints: amadeusEndpoints,
      path     : 'amadeus',
    },
  ].forEach(({ endpoints, path }) => (
    Object.keys(endpoints).forEach((endpoint) => {
      const handler = endpoints[endpoint];
      if (typeof handler === 'function' || Array.isArray(handler)) {
        app.post(`/${path}/${endpoint}`, handler);
      } else {
        app[handler.method](`/${path}/${endpoint}`, handler.controller);
      }
    })
  ));
};
