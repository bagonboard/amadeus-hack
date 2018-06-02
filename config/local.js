module.exports = {
  server   : {
    hostname: process.env.HOSTNAME || "localhost",
    port    : process.env.PORT     || 3000,
  },
  amadeus: {
    clientId: 'fWiWHcG1YdGjqG0SrW4REFIJGev7amgO',
    clientSecret: '2TpoIfiJg7BeNRsz',
    logLevel: 'error',
  },
  localURL : `http://${process.env.HOSTNAME || "localhost"}:3000/`,
  slackWebhooks: {
  },
};
