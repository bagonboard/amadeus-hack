module.exports = {
  server   : {
    hostname: process.env.HOSTNAME || "localhost",
    port    : process.env.PORT     || 8090,
  },
  amadeus: {
    clientId: 'fWiWHcG1YdGjqG0SrW4REFIJGev7amgO',
    clientSecret: '2TpoIfiJg7BeNRsz',
    logLevel: 'debug'
  },
  localURL : 'http://localhost:8090/',
  slackWebhooks: {
  },
};
