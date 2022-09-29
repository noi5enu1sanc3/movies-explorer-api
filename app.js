const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

const main = async (next) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
  } catch (err) {
    next(err);
  }
  try {
    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    next(err);
  }
};

main();
