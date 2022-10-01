const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateAddMovie,
  validateGetMovieById,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateAddMovie, addMovie);
router.delete('/movies/:_id', validateGetMovieById, deleteMovie);

module.exports = router;
