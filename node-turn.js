var Turn = require('node-turn');
var server = new Turn({
  // set options
//   listeningIps: ['0.0.0.0'],
  authMech: 'long-term',
  credentials: {
    username: "password"
  }
});
console.log('working?')
server.start();