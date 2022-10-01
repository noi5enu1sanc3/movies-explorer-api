require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const helmet = require('helmet');

const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const { MONGO_URL } = require('./helpers/config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(router);

const main = async (next) => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (err) {
    next(err);
  }
  try {
    await app.listen(PORT);
  } catch (err) {
    next(err);
  }
};

main();

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
