const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../helpers/errors/NotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');
const ForbiddenError = require('../helpers/errors/ForbiddenError');
const { forbiddenErrorMessage, movieNotFoundMessage, validationErrorMessage } = require('../helpers/constants');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send({ movies });
  } catch (err) {
    next(err);
  }
};

const addMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const movie = await (
      await Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: req.user._id,
      })
    ).populate('owner');
    res.send({ movie });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const requestedMovie = await Movie.findById(req.params.movieId)
      .orFail(() => next(new NotFoundError(movieNotFoundMessage)));
    if (req.user._id !== requestedMovie.owner._id.toString()) {
      next(new ForbiddenError(forbiddenErrorMessage));
    } else {
      const movie = await Movie.findByIdAndRemove(req.params._id);
      res.send({ movie });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
