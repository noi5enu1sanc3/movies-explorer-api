const mongoose = require('mongoose');
const linkRegex = require('../helpers/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: linkRegex,
  },
  thumbnail: {
    type: String,
    required: true,
    match: linkRegex,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

// PRE MIDDLEWARE
movieSchema.pre('save', function saveId(next) {
  this.movieId = this._id;
  this.movieId.required = true;

  next();
});

module.exports = mongoose.model('movie', movieSchema);
