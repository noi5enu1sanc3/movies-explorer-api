require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const helmet = require('helmet');

const cors = require('cors');

const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const { MONGO_URL_DEV } = require('./helpers/config');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      'http://localhost:3002',
      'https://localhost:3002',
      'https://noi5e.nomoredomains.icu',
    ],
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.use(router);

const main = async (next) => {
  try {
    await mongoose.connect(
      NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV,
    );
    app.listen(PORT);
  } catch (err) {
    next(err);
  }
};

main();

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
