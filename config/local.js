module.exports = {
  server   : {
    hostname: process.env.HOSTNAME || "localhost",
    port    : process.env.PORT     || 8090,
  },
  amadeus: {
    clientId: 'fWiWHcG1YdGjqG0SrW4REFIJGev7amgO',
    clientSecret: '2TpoIfiJg7BeNRsz',
    logLevel: 'error',
    appVersion: '2'
  },
  localURL : 'http://localhost:8090/',
  slackWebhooks: {
    
  },
};

/*
{
    key   : 'N0ADmAT5uBGNA756tDFq7GtzXp0ErHG7',
    secret: 'ag2Yr8kxS0GZrsKI',
  },
  */