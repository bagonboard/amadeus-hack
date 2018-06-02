const amadeusEndpoints = require('./amadeus');

module.exports = (app) => {
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
