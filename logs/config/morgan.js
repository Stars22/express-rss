const morgan = require('morgan');
const winston = require('./winston');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));
const logger = morgan('{"url": ":url", "body": ":body", "query": ":query"}', {
  stream: winston.stream
});

module.exports = logger;
