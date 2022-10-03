const router = require('express').Router();
const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');

const {
  validateUpdateUserProfile,
} = require('../middlewares/validation');

router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUpdateUserProfile, updateUserProfile);

module.exports = router;
