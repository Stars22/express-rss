const morgan = require('morgan');
const winston = require('./winston');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));
const logger = morgan('{"url": ":url", "body": ":body", "query": ":query"}', {
  stream: winston.stream
});

function logError(err) {
  winston.error({
    message: `Error message: ${err.message}. Status ${err.status}`
  });
}

module.exports = { logger, logError };
