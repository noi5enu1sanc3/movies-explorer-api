const router = require('express').Router();
const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUserProfile);

module.exports = router;
