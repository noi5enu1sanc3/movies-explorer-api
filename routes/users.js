const router = require('express').Router();
const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateUserProfile,
} = require('../middlewares/validation');

router.get('/users/me', validateUserId, getUserInfo);
router.patch('/users/me', validateUpdateUserProfile, updateUserProfile);

module.exports = router;
