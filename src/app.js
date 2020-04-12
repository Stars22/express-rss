const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const createError = require('http-errors');
const { logger, logError, logRejection } = require('../logs/config');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

logRejection();
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(logger);
app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  logError(err);
  res.status(err.status).json({ error: err.message });
});

module.exports = app;
