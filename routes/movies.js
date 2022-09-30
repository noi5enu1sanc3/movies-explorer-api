const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', addMovie);
router.delete('/moves/:_id', deleteMovie);

module.exports = router;
