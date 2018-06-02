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
  localURL : 'http://localhost:3000/',
  slackWebhooks: {
    
  },
};

/*
{
    key   : 'N0ADmAT5uBGNA756tDFq7GtzXp0ErHG7',
    secret: 'ag2Yr8kxS0GZrsKI',
  },
  */