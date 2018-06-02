const path = require('path');

const validEnvironments = ['local', 'production'];
const environment = (process.env.NODE_ENV && validEnvironments.indexOf(process.env.NODE_ENV) > 0)
  ? process.env.NODE_ENV
  : 'local';

process.env.NODE_ENV = environment;

module.exports = {
  // Root path of server
  root: path.normalize(__dirname + '/..'),
  // environment configuration
  ...require('./' + environment + '.js')
};
