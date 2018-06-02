const axios = require('axios');
const { devError } = require('../../config').slackWebhooks;

const errors = {
  notAuthorized: 'Not authorized environment.',
};

module.exports = {
  sendToSlack,
};

const canSend = (process.env.NODE_ENV !== 'local');

async function sendToSlack(text) {
  try {
    if (!canSend) return false;
    const result = await axios.post(devError, { text });
    return result;
  } catch (error) {
    return false;
  }
}
